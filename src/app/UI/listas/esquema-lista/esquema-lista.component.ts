import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { PersonaConPoderes } from '../../../Model/Domain/personaConPoderes';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esquema-lista',
  templateUrl: './esquema-lista.component.html',
  styleUrls: ['./esquema-lista.component.css'],
})
export class EsquemaListaComponent implements OnInit, AfterViewInit {
  @Input() params: PersonaConPoderes[] = [];
  @Input() title: string = '';
  selectedItem!: PersonaConPoderes;
  @ViewChild('menu') menu!: ContextMenu;
  @Output() delete = new EventEmitter<PersonaConPoderes>();
  @Output() edit = new EventEmitter<PersonaConPoderes>();
  contador: number = 0;
  items: MenuItem[] = [];
  headers: any[] = [];
 
  constructor(private router: Router) {}

  ngOnInit() {
    this.initializeHeaders();
    this.initializeMenuItems();
  }

  ngAfterViewInit() {
    console.log(this.menu);
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

  onContextMenu(event: MouseEvent, item: PersonaConPoderes) {
    event.preventDefault();
    this.selectedItem = item;
    this.menu.show(event);
  }
 
}
