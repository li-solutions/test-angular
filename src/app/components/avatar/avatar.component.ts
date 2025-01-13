import {Component, Input} from '@angular/core';
import {AvatarModule} from 'primeng/avatar';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-avatar',
  imports: [AvatarModule, NgIf],
  templateUrl: './avatar.component.html',
  standalone: true,
  styleUrl: './avatar.component.css'
})
export class AvatarComponent {
  private _userName?: string;

  @Input()
  set userName(value: string | undefined) {
    this._userName = value;
    this.visible = !!value;
  }

  get userName(): string | undefined {
    return this._userName;
  }

  visible: boolean = false;
}
