import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Output() keyPress = new EventEmitter<string>();

  onKey(key: string) {
    this.keyPress.emit(key);
  }
}
