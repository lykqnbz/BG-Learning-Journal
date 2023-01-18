import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { SettingsComponent } from '@library/theme-selector/component/settings/settings.component';
// import { MonacoEditorModule } from '@rickzhou/ngx-monaco-editor';
// import { BasicSyntaxModule } from '@views/basic-syntax/basic-syntax.module';
import { CommonModule } from '@angular/common';

@NgModule({
  // 引入组件 / 指令 / 管道
  declarations: [AppComponent],
  // 引入其他 NgModule
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule],
  // 在全局服务中生效的一些Provider
  providers: [],
  // 导入组件 / 指令 / 管道  在declarations引入的模版中就可以使用这些
  exports: [],
  // 应用的主视图 只有根模块才可以使用
  bootstrap: [AppComponent]
})
export class AppModule { }



  // imports: [BrowserModule, BrowserAnimationsModule, CommonModule, FormsModule, HttpClientModule, SettingsComponent, MonacoEditorModule.forRoot(), AppRoutingModule, 

