import { Command } from "commander";

type TelegramResponse = {
  ok: boolean;
  result?: {
    message_id?: number;
  };
  description?: string;
};

const program = new Command();

program
  .name("sendkit")
  .description("Sendkit Cli")
  .command("telegram")
  .description("Send a telegram mesaage")
  .argument("<chatId>", "Telegram Chat ID")
  .argument("<message>", "Message text to send")

  .action(async (chatId: string, message: string) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
      console.error("Missing TELEGRAM_BOT_TOKEN environment variable");
      process.exit(1);
    }

    if (!chatId) {
      console.error("Missing telegram chat Id");
      process.exit(1);
    }

    if (!message) {
      console.log("Missing telegram msg text");
      process.exit(1);
    }

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      },
    );
    const data = (await response.json()) as TelegramResponse;

    if (!response.ok || !data.ok) {
      const details = data.description ?? response.statusText;
      console.error(`Telegram API request failed: ${details}`);
      process.exit(1);
    }

    const messageId = data.result?.message_id;
    console.log(`Telegram message ID ${messageId}`);

    if (messageId !== undefined) {
      console.log(`Telegram message Id : ${messageId}`);
    }
  });

program.parseAsync(process.argv);

// https://api.telegram.org
