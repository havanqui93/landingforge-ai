import { ThemeProvider } from "@/components/ThemeProvider";
import { LandingErrorBoundary } from "@/components/LandingErrorBoundary";
import { Masthead } from "./blocks/Masthead";
import { IndexList } from "./blocks/IndexList";
import { Ticker } from "./blocks/Ticker";
import { Dispatches } from "./blocks/Dispatches";
import { Ledger } from "./blocks/Ledger";
import { Dossier } from "./blocks/Dossier";
import { Colophon } from "./blocks/Colophon";
import type { EditorialConfig, Block } from "@/lib/editorial.types";

/**
 * Editorial template's renderer — structurally the same contract as
 * LandingRenderer (exhaustive switch, `never` fallback) but over the
 * independent `Block` union, so it never has to change when the default
 * template's `Section` union changes, and vice versa.
 */
function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case "masthead":
      return <Masthead key={index} data={block} />;
    case "index":
      return <IndexList key={index} data={block} />;
    case "ticker":
      return <Ticker key={index} data={block} />;
    case "dispatches":
      return <Dispatches key={index} data={block} />;
    case "ledger":
      return <Ledger key={index} data={block} />;
    case "dossier":
      return <Dossier key={index} data={block} />;
    case "colophon":
      return <Colophon key={index} data={block} />;
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}

export function EditorialRenderer({ config }: { config: EditorialConfig }) {
  return (
    <LandingErrorBoundary>
      <ThemeProvider theme={config.theme}>
        <main>{config.blocks.map(renderBlock)}</main>
      </ThemeProvider>
    </LandingErrorBoundary>
  );
}
