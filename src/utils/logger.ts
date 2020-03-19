import { get } from "lodash";
import is from "./is";

export type StyleKeys = "info" | "warn" | "error";
export type Style = {
  emoji: string;
  banner: string;
  bannerStyle: string;
};
export type IStyleSheet = {
  [key in StyleKeys]: Style;
};
export type LoggerArgs = [any, string?, string?];
export type LoggerSignature = (...args: LoggerArgs) => Logger;

export interface IOutputRules {
  axios(log: any): void;
}

const styleSheet: IStyleSheet = {
  info: {
    emoji: "🌟🌟",
    banner: "<=== 💅数据展示🌝 ===>",
    bannerStyle:
      "color: #ffffff; font-weight: bold; background-color: #36b07a; border-radius: 2px; padding: 4px 10px;"
  },
  warn: {
    emoji: "😯😯",
    banner: "<=== 🔥警告展示⚡ ===>",
    bannerStyle:
      "color: #ffffff; font-weight: bold; background-color: #f8b33f; border-radius: 2px; padding: 4px 10px;"
  },
  error: {
    emoji: "😱😱",
    banner: "<=== 💣错误展示👻 ===>",
    bannerStyle:
      "color: #ffffff; font-weight: bold; background-color: #ffeeee; border-radius: 2px; padding: 4px 10px;"
  }
};

const outputRules: IOutputRules = {
  axios(log) {
    console.log("status：", log.status);
    console.log("headers：", log.headers);
    console.log("data：", log.data);
    console.log("服务状态码：", log.data.code);
    console.log("接口数据：", log.data.data);
  }
};

class Logger {
  log: string;
  style?: Style;
  banner?: string;
  getRule?: string;
  outputRule?: keyof IOutputRules;

  constructor([log, banner, getRule]: LoggerArgs) {
    this.log = log;
    this.banner = banner;
    this.getRule = getRule;
  }

  boot(target: StyleKeys) {
    const style = (this.style = styleSheet[target]);
    this.banner = `%c${style.emoji}${this.banner || style.banner}${
      style.emoji
    }`;
    this.output();
  }

  info(outputRule?: keyof IOutputRules) {
    this.outputRule = outputRule;
    this.boot("info");
  }

  warn(outputRule?: keyof IOutputRules) {
    this.outputRule = outputRule;
    this.boot("warn");
  }

  error(outputRule?: keyof IOutputRules) {
    this.outputRule = outputRule;
    this.boot("error");
  }

  output() {
    let log = this.log;
    let rule = this.getRule;

    if (rule) {
      this.log = get(log, rule, log);
    }

    if (is.array(log)) {
      this.isArray();
    } else if (is.object(log)) {
      this.isObject();
    } else {
      this.isValue();
    }
  }

  isArray() {
    console.log(this.banner, this.style!.bannerStyle);

    if (this.outputRule) {
      const outputRule = outputRules[this.outputRule];
      outputRule(this.log);
    } else {
      console.log(this.log);
      console.table(this.log);
    }
  }

  isObject() {
    console.log(this.banner, this.style!.bannerStyle);

    if (this.outputRule) {
      const outputRule = outputRules[this.outputRule];
      outputRule(this.log);
    } else {
      console.log(this.log);
    }
  }

  isValue() {
    console.log(this.banner, this.style!.bannerStyle);

    if (this.outputRule) {
      const outputRule = outputRules[this.outputRule];
      outputRule(this.log);
    } else {
      console.log(this.log);
    }
  }
}

const logger: LoggerSignature = (...args) => {
  return new Logger(args);
};

console.logger = logger;
