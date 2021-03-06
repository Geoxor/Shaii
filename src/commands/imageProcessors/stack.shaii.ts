import Discord from "discord.js";
// @ts-ignore this has broken types :whyyyyyyyyyyy:
import fileType from "file-type";
import { stack } from "../../logic/imageProcessors.shaii";
import { parseBufferFromMessage, preProcessBuffer } from "../../logic/logic.shaii";
import { defineCommand } from "../../types";

// TODO: Refactor this to the main image processors
// so we can easily override the frames for diff
// processors blah blah fuck your mom
const stacks: {
  [key: string]: number;
} = {
  wasted: 90,
  vignette: 90,
  fuckyou: 90,
};

export default defineCommand({
  name: "stack",
  category: "IMAGE_PROCESSORS",
  usage: `stack <processor_name> <image | url | reply | user_id>`,
  description: "Stack an image processor and make a gif out of it",
  requiresProcessing: true,
  execute: async (message) => {
    const processorFunctionName = message.args[0];
    if (!processorFunctionName) return "Please enter the name of an image processor function";
    const buffer = await parseBufferFromMessage(message);
    const preProccessed = await preProcessBuffer(buffer);
    const resultbuffer = await stack(processorFunctionName, preProccessed, stacks[processorFunctionName]);
    const mimetype = await fileType(resultbuffer);
    const attachment = new Discord.MessageAttachment(resultbuffer, `shit.${mimetype.ext}`);
    return { files: [attachment] };
  },
});
