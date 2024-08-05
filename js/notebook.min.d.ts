declare module "jupyter-notebook-viewer/js/notebook.min.js" {
  interface NotebookMetadata {
    title?: string;
    name?: string;
    language?: string;
    kernelspec?: { language: string };
    language_info?: { name: string };
  }

  interface RawCell {
    cell_type: string;
    source: string | string[];
    prompt_number?: number;
    execution_count?: number;
    outputs?: RawOutput[];
    input?: string[];
    level?: number;
  }

  interface RawOutput {
    output_type: string;
    data?: { [key: string]: string | string[] };
    text?: string | string[];
    stream?: string;
    name?: string;
    traceback?: string[];
  }

  interface RawWorksheet {
    cells: RawCell[];
  }

  interface RawNotebook {
    metadata?: NotebookMetadata;
    worksheets?: RawWorksheet[];
    cells?: RawCell[];
  }

  interface Config {}

  class Input {
    constructor(raw: string | string[], cell: Cell);
    render(): HTMLElement;
  }

  class Output {
    constructor(raw: RawOutput, cell: Cell);
    render(): HTMLElement;
  }

  class Cell {
    raw: RawCell;
    worksheet: Worksheet;
    type: string;
    number?: number;
    input?: Input;
    outputs?: Output[];

    constructor(raw: RawCell, worksheet: Worksheet);
    render(): HTMLElement;
  }

  class Worksheet {
    raw: RawWorksheet;
    notebook: Notebook;
    cells: Cell[];

    constructor(raw: RawWorksheet, notebook: Notebook);
    render(): HTMLElement;
  }

  class Notebook {
    raw: RawNotebook;
    config: Config;
    metadata: NotebookMetadata;
    title?: string;
    worksheets: Worksheet[];
    sheet: Worksheet;

    constructor(raw: RawNotebook, config: Config);
    render(): HTMLElement;
  }

  function parse(nbjson: RawNotebook, config?: Config): Notebook;

  const nb: {
    prefix: string;
    markdown: (text: string) => string;
    ansi: (text: string) => string;
    sanitizer: (html: string) => string;
    highlighter: (code: string, pre_el?: HTMLElement, code_el?: HTMLElement, lang?: string) => string;
    VERSION: string;
    Input: typeof Input;
    Output: typeof Output;
    Cell: typeof Cell;
    Worksheet: typeof Worksheet;
    Notebook: typeof Notebook;
    parse: typeof parse;
    coalesceStreams(outputs: Output[]): Output[];
    display: {
      [key: string]: (data: string | string[]) => HTMLElement;
    };
    display_priority: string[];
  };

  export = nb;
}