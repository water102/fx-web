class FxMessageBox {
    async requireLib() {
        return await import('bootbox');
    }

    async alert(options) {
        const bootbox = await this.requireLib();
        options.title = options.title || 'Alert';
        options.backdrop = options.backdrop || true;
        options.onEscape = options.onEscape || true;
        bootbox.alert(options);
    }

    async prompt(options) {
        const bootbox = await this.requireLib();
        options.title = options.title || 'Prompt';
        options.backdrop = options.backdrop || true;
        options.onEscape = options.onEscape || true;
        bootbox.prompt(options);
    }

    async confirm(options) {
        const bootbox = await this.requireLib();
        options.title = options.title || 'Confirm';
        options.backdrop = options.backdrop || true;
        options.onEscape = options.onEscape || true;
        bootbox.confirm(options);
    }

    async dialog(options, callback) {
        const bootbox = await this.requireLib();
        options.title = options.title || 'Dialog';
        options.backdrop = options.backdrop || true;
        options.onEscape = options.onEscape || true;
        return bootbox.dialog(options);
    }
}
export const fxMessageBox = new FxMessageBox();