import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditArticleComponent } from './edit-article.component';
import { RouterModule } from '@angular/router';
import {QuillModule, defaultModules} from 'ngx-quill'
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditArticleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:EditArticleComponent}
    ]),
    ReactiveFormsModule,
    QuillModule.forRoot({
      modules:{
        toolbar:{
          container: defaultModules.toolbar,
          handlers : {
            image : function (this:any) {
              const tooltip = this.quill.theme.tooltip;
              const originalSave = tooltip.save;
              const originalHide = tooltip.hide;
              tooltip.save = function(this: any) {
                const range = this.quill.getSelection(true);
                const value = this.textbox.value;
                if (value) {
                  this.quill.insertEmbed(range.index, 'image', value, 'user');
                }
              };
              // Called on hide and save.
              tooltip.hide = function (this: any) {
                tooltip.save = originalSave;
                tooltip.hide = originalHide;
                tooltip.hide();
              };
              tooltip.edit('image');
              tooltip.textbox.placeholder = "Embed URL";
            }
          }
        }
      }
    }),
  ]
})
export class EditArticleModule { }
