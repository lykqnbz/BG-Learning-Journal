import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { getRandomIcon } from '@utils/index';
import { InlineSVGModule } from 'ng-inline-svg-2';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InlineSVGModule, RouterModule],
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.scss']
})
export class HomeView {
  // ViewChild和@ViewChildren是Angular提供给的装饰器，用于从模板视图中获取匹配的元素，可以简单理解成document.getElementById(xxx)
  // 用法1：通过viewChild访问Dom元素
  // 用法1-1：通过局部变量访问 @ViewChild('more') moreRef!: ElementRef;   在html的标签内用#more进行定位，<p #more>XXX</p>
  // 用法1-2：直接指定组件类 @ViewChild(TestComponent) test: TestComponent;   TestComponent是子组件暴露类名
  // 用法2：通过@ViewChild来拿到Service类 ，比如子组件provider提供了一个ChildService类。我们通过@ViewChild来拿到这个ChildService类
  // 用法3：创建内嵌视图(ViewContainerRef) 把 ng-template的内容认为是嵌入视图。 template在页面上默认不显示，通过创建视图显示出来
  // 用法4：@ViewChildren匹配多个子组件并访问 ViewChildren 装饰器是用来从模板视图中获取匹配的多个元素，返回的结果是一个 QueryList 集合
  @ViewChild('more') moreRef!: ElementRef;
  private animateStart = ['transition', 'ease-out', 'duration-200'];
  private animateEnd = ['transition', 'ease-in', 'duration-150'];

  public svg = getRandomIcon();

  constructor() {
    document.addEventListener('click', () => {
      const isHidden = Array.from(this.moreRef.nativeElement.classList).includes('hidden');
      if (!isHidden) {
        this.hiddenNavMore();
      }
    });
  }
  public handleToggleMore(event: Event) {
    event.stopPropagation();
    const isHidden = Array.from(this.moreRef.nativeElement.classList).includes('hidden');
    if (isHidden) {
      this.showNavMore();
    } else {
      this.hiddenNavMore();
    }
  }
  public hiddenNavMore() {
    this.moreRef.nativeElement.classList.remove(...this.animateStart);
    this.moreRef.nativeElement.classList.add('hidden', ...this.animateEnd);
  }

  public showNavMore() {
    this.moreRef.nativeElement.classList.remove('hidden', ...this.animateEnd);
    this.moreRef.nativeElement.classList.add(...this.animateStart);
  }
}
