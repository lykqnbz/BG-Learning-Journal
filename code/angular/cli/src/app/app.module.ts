import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from '@/library/theme-selector/component/settings/settings.component';
import { MonacoEditorModule } from '@rickzhou/ngx-monaco-editor';
import { HomeView } from '@views/home/home.view';
import { CommonModule } from '@angular/common';

@NgModule({
  // 引入项目所需的组件 / 指令 / 管道
  declarations: [AppComponent],
  // 引入当前模块运行依赖的其他模块    BrowserModule为浏览器解析模块
  imports: [BrowserModule, BrowserAnimationsModule, CommonModule, FormsModule, HttpClientModule, SettingsComponent, MonacoEditorModule.forRoot(), AppRoutingModule, HomeView],
  // 在全局服务中生效的一些Provide，即项目所需要的服务
  providers: [],
  // 导入组件 / 指令 / 管道 ，在declarations引入的模版中就可以使用这些
  exports: [],
  // 应用的主视图 只有根模块才可以使用，即指定应用的主视图(根目录)，通过引导根appModule来启动应用，这里一般写的是根组件
  bootstrap: [AppComponent]
})
// 根模块不需要导出任何东西，因为其他组件不需要导入根模块
export class AppModule { } 




