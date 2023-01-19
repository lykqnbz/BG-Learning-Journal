import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UmberUnitPipe } from './umberUnit.pipe';
import { ObjIsEmptyPipe } from './objIsEmpty.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    UmberUnitPipe,
    ObjIsEmptyPipe
  ],
  declarations: [
    UmberUnitPipe,
    ObjIsEmptyPipe
  ]
})
export class PipeModuleModule {
  static forRoot() {
    return {
      ngModule: PipeModuleModule,
      providers: [],
    };
  }
}