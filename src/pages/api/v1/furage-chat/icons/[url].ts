import axios from 'axios';
import { createCanvas, loadImage } from 'canvas';
import parseContentType from 'content-type-parser';
import { type NextApiHandler } from 'next';
import { loginHandle } from '~/util/token';
import { ApiTemplate } from '~api-template/ApiTemplate';

const resolveResize = (rawSize: string): number => {
  if (!/^[1-9]\d*$/.test(rawSize)) {
    return NaN;
  }

  const size = Number(rawSize);

  return size;
};

const handler: NextApiHandler = async (...args) => new ApiTemplate(...args).handle([
  loginHandle,
  {
    methods: ['GET', 'HEAD'],
    handler: async ctx => {
      const { req } = ctx;
      const rawSize = req.query.size;

      if (typeof rawSize !== 'string') {
        ctx.sendJsonByStatusCode(400);

        return;
      }

      const size = resolveResize(rawSize);

      if (Number.isNaN(size) || size > 256) {
        ctx.sendJsonByStatusCode(400);

        return;
      }

      const rawUrl = req.query.url;

      if (typeof rawUrl !== 'string') {
        ctx.sendJsonByStatusCode(400);

        return;
      }

      try {
        const { hostname } = new URL(rawUrl);

        if (
          hostname !== 'i.imgur.com' &&
          hostname !== 'cdn.discordapp.com' &&
          hostname !== 'media.discordapp.net'
        ) {
          ctx.sendJsonByStatusCode(400);

          return;
        }

        const { data, headers } = await axios.get<Buffer>(rawUrl, {
          responseType: 'arraybuffer'
        });
        const contentTypeHeader = headers['content-type'];
        const contentType = parseContentType(contentTypeHeader);

        if (
          !contentType ||
          contentType.type !== 'image' || (
            contentType.subtype !== 'png' &&
            contentType.subtype !== 'jpeg' &&
            contentType.subtype !== 'jpg'
          )
        ) {
          ctx.sendJsonByStatusCode(415);

          return;
        }

        const mimeType = (
          contentType.subtype === 'jpeg' || contentType.subtype === 'jpg'
            ? 'image/jpeg'
            : 'image/png'
        );
        const img = await loadImage(data);
        const width = Math.min(size, img.naturalWidth);
        const height = Math.min(size, img.naturalHeight);
        const computedSize = Math.min(width, height);
        const cv = createCanvas(computedSize, computedSize);
        const cvCtx = cv.getContext('2d');

        cvCtx.drawImage(img, 0, 0, computedSize, computedSize);

        const buf = cv.toBuffer(mimeType as 'raw');

        ctx.setHeader('Content-Type', mimeType);
        ctx.setHeader('Content-Length', buf.byteLength);
        ctx.send(buf);

        return;
      } catch (err) {
        if (!(err instanceof Error)) {
          ctx.sendJsonByStatusCode(500);

          return;
        }

        if ((err instanceof TypeError) && err.message === 'Invalid URL') {
          ctx.sendJsonByStatusCode(400);

          return;
        }

        if (err.message === 'Unsupported image type') {
          ctx.sendJsonByStatusCode(415);

          return;
        }

        ctx.sendJsonByStatusCode(500);
      }
    }
  }
]);

export default handler;
