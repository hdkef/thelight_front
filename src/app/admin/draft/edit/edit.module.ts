import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { defaultModules, QuillModule } from 'ngx-quill';



@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
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
export class EditModule { }
