import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esquema-lista',
  templateUrl: './esquema-lista.component.html',
  styleUrls: ['./esquema-lista.component.css'],
})
export class EsquemaListaComponent implements OnInit,  OnChanges {
  //@Input() params: PersonaConPoderes[] = [];

  @Input() params: any[] = [];
  @Input() title: string = '';
  selectedItem!: any;
  @ViewChild('menu') menu!: ContextMenu;
  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  items: MenuItem[] = [];
  headers: any[] = [];
  emptyRows: number = 0;

  constructor(private router: Router) {}
  ngOnChanges(): void {
    this.rellenador();
  }

  ngOnInit() {
    this.initializeHeaders();
    this.initializeMenuItems();
  
    this.rellenador();
  }

 

  initializeHeaders() {
    if (this.params.length) {
      this.headers = Object.keys(this.params[0]).map((key) => ({
        field: key,
        header: key.charAt(0).toUpperCase() + key.slice(1),
      }));
    }
  }

  initializeMenuItems() {
    this.items = [
      {
        label: 'Create',
        icon: 'pi pi-plus',
        command: () => {
          this.router.navigate(['/new' + this.title]);
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          this.delete.emit(this.selectedItem);
          console.log(this.selectedItem);
        },
      },
      {
        label: 'Edit',
        icon: 'pi pi-file-edit',
        command: () => {
          this.edit.emit(this.selectedItem);
        },
      },
    ];
  }

  onContextMenu(event: MouseEvent, item: any) {
    event.preventDefault();
    this.selectedItem = item;
    this.menu.show(event);
  }
 
  rellenador() {
    while (this.params.length % 5 != 0  ) {
      this.params.push([]);
    }
  }
}
