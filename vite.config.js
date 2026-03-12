export default {
    base: './',
    root: 'src',
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                main: 'index.html',
                toolchain: 'toolchain.html',
            }
        }
    }
}