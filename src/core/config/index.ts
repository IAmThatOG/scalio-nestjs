interface IConfiguration {
  port: number;
  templateViewEngine: string;
  staticDir: string;
  viewsDir: string;
}

export default (): IConfiguration => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  templateViewEngine: process.env.TEMPLATE_VIEW_ENGINE,
  staticDir: process.env.STATIC_DIR,
  viewsDir: process.env.VIEWS_DIR,
});
