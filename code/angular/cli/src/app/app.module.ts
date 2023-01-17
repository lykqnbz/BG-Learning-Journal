import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  // 引入组件 / 指令 / 管道
  declarations: [AppComponent],
  // 引入其他 NgModule
  imports: [BrowserModule],
  // 在全局服务中生效的一些Provider
  providers: [],
  // 导入组件 / 指令 / 管道  在declarations引入的模版中就可以使用这些
  exports: [],
  // 应用的主视图 只有根模块才可以使用
  bootstrap: [AppComponent]
})
export class AppModule { }
