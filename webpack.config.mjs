import path from "path"
import url from "url"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

export default {
  entry: "./src/index.ts",
  output: {
    filename: "js/[name]-[contenthash].js",
    path: path.resolve(__dirname, "docs"),
    assetModuleFilename: "assets/[name]-[contenthash][ext]",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash].css",
    }),
  ],
  mode: "development",
}
