import { Command } from "commander";
import { sendTelegramMessage } from "sendkit-core";

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

    try {
      const result = await sendTelegramMessage({
        botToken: token,
        chatId,
        message,
      });

      console.log(`Sent Telegram message to chat ${result.chatId}.`);
      console.log(`Telegram message ID: ${result.messageId}`);
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      console.error(`Telegram API request failed: ${detail}`);
      process.exit(1);
    }
  });

program.parseAsync(process.argv);
