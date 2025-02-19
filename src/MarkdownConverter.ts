import DOMPurify from "dompurify";
import { marked } from "marked";
import TurndownService from "turndown";

const turndownService = new TurndownService({ codeBlockStyle: "fenced" });

turndownService.addRule("strikethrough", {
  filter: ["del", "s", "strike"] as any,
  replacement: (content) => "~" + content + "~",
});

turndownService.addRule("heading", {
  filter: "h1",
  replacement: (content) => "# " + content,
});

class MarkdownConverter {
  public async convertMarkdownToHtml(markdown: string): Promise<string> {
    return DOMPurify.sanitize(await marked(markdown));
  }

  public convertHtmlToMarkdown(html: string): string {
    return turndownService.turndown(html);
  }
}

export default new MarkdownConverter();
