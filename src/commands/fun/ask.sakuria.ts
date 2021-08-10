import { IMessage } from "../../types";
import answers from "../../assets/answers.json";

export default {
  name: "ask",
  description: "Ask sakuria a yes or no question",
  requiresProcessing: false,
  execute: (message: IMessage): string => {
    // Reply if no args
    if (message.args.length === 0)
      return "Yeah you gotta ask a question you know? you can't just fuckin tell me the command and ask nothing idiot";
    return answers[~~(Math.random() * answers.length - 1)];
  },
};