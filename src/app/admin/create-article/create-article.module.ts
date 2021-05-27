import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArticleComponent } from './create-article.component';
import { RouterModule } from '@angular/router';
import { QuillModule,defaultModules } from 'ngx-quill'
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateArticleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:CreateArticleComponent}
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

export class CreateArticleModule {}
