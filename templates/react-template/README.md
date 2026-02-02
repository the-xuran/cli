# xuran react-template

基于 `xuran` 的 `react` 模板，用于快速创建一个 `react` 项目。

## 扩展ESLint配置

如果您正在开发生产应用程序，我们建议更新配置以启用类型感知的代码检查规则：

```js
export default tseslint.config([
	globalIgnores(["dist"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			// Other configs...

			// Remove tseslint.configs.recommended and replace with this
			...tseslint.configs.recommendedTypeChecked,
			// Alternatively, use this for stricter rules
			...tseslint.configs.strictTypeChecked,
			// Optionally, add this for stylistic rules
			...tseslint.configs.stylisticTypeChecked

			// Other configs...
		],
		languageOptions: {
			parserOptions: {
				project: ["./tsconfig.node.json", "./tsconfig.app.json"],
				tsconfigRootDir: import.meta.dirname
			}
			// other options...
		}
	}
]);
```

您还可以安装 [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) 和 [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) 来设置针对 React 的特定代码检查规则：

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
	globalIgnores(["dist"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			// Other configs...
			// Enable lint rules for React
			reactX.configs["recommended-typescript"],
			// Enable lint rules for React DOM
			reactDom.configs.recommended
		],
		languageOptions: {
			parserOptions: {
				project: ["./tsconfig.node.json", "./tsconfig.app.json"],
				tsconfigRootDir: import.meta.dirname
			}
			// other options...
		}
	}
]);
```

## 关于

作者：[徐然](https://github.com/xiaoxustudio)

联系方式：[xugame@qq.com](emailto://xugame@qq.com)

欢迎提出您宝贵的 **issue**，我们将会处理。

## LICENSE

[MIT](./LICENSE)
