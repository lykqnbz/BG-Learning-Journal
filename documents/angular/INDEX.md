# angular
- <a href='#topic1'>AG独有项目文件结构和相关配置</a>
- <a href='#topic2'>学习后继续补充</a>　

---

### <a id='topic1' style='text-decoration:none;'>AG独有项目文件结构和相关配置</a>

- <b>angular.json</b>：为工作区中的所有项目指定 CLI 的默认配置，包括 CLI 要用到的构建、启动开发服务器和测试工具的配置项，比如 Karma 和 Protractor。
- <b>src/main.ts</b>：应用的主要入口点。用 JIT 编译器编译应用，然后引导应用的根模块（AppModule）在浏览器中运行。
- <b>src/app/app.component.ts</b>：为应用的根组件定义逻辑，名为 AppComponent。当你向应用中添加组件和服务时，与这个根组件相关联的视图就会成为视图树的根。
- <b>src/app/app.component.html</b>：定义与根组件 AppComponent 关联的 HTML 模板。
- <b>src/app/app.component.css</b>：为根组件 AppComponent 定义了基本的 CSS 样式表。
- <b>src/app/app.component.spec.ts</b>：为根组件 AppComponent 定义了一个单元测试。
- <b>src/app/app.module.ts</b>：定义了名为 AppModule 的根模块，它会告诉 Angular 如何组装应用。这里最初只声明一个 AppComponent。当你向应用中添加更多组件时，它们也必须在这里声明。
- <b>projects/项目名</b>：多项目工作区，继承大部分工作区配置，同样也可以拥有独有的配置，例如：tsconfig.app.json，tsconfig.spec.json等
- <b>projects/项目名/tsconfig.app.json</b>：多项目应用专属的 TypeScript 配置，包括 TypeScript 和 Angular 模板编译器的选项。
- <b>projects/项目名/tsconfig.spec.json</b>：多项目应用测试的 TypeScript 配置。
- <b>projects/库名/src/lib</b>：包含库项目的逻辑和数据。像应用项目一样，库项目也可以包含组件、服务、模块、指令和管道。
- <b>projects/库名/src/public-api.ts</b>：指定从库中导出的所有文件。
- <b>projects/库名/ng-package.json</b>：构建库时，ng-packagr 用到的配置文件。
- <b>projects/库名/tsconfig.lib.json</b>：库专属的 TypeScript 配置，包括 TypeScript 和 Angular 模板编译器选项。
- <b>projects/库名/tsconfig.lib.prod.json</b>：库专属的 TypeScript 配置，用于构建生产模式的库。
- <b>projects/库名/tsconfig.spec.json</b>：测试库时用到的 TypeScript 配置。
  