import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from 'src/app/sercives/noticia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {
  lista: Noticia[] = []; //
  constructor(
    private noticiaServicio: NoticiaService,
    @Inject(DOCUMENT) document: Document
  ) { }

  ngOnInit(): void {
    this.noticiaServicio.getAll().subscribe((datos) => {
      datos.map((a:any) => {
        a.fecha = a.fecha.toDate();
        return a;
      });
      this.lista = datos;
    })
  }
  async nuevaNoticia() {
    const { value: formValues } = await Swal.fire({
      title: 'Multiple inputs',
      html: `<label for="">Titulo de la Noticia</label>
        <input required id="titulo" class="form-control" placeholder="Titulo de la Noticia" >
        <label for="">Descripcion</label>
        <input required id="descripcion" class="form-control" placeholder="Descripcion" >
        <label for="">Fecha de Publicacion</label>
        <input required id="fecha" type="date" class="form-control" placeholder="Fecha" >
        <label for="">Autor</label>
        <input required id="autor" class="form-control" placeholder="Autor" >
        <label for="">Categoria</label>
        <input required id="categoria" class="form-control" placeholder="Categoria" >`,
      focusConfirm: false,
      preConfirm: () => {
        //validar

        let t: Noticia = {
          titulo: (<HTMLInputElement>document.getElementById('titulo')).value,
          descripcion: (<HTMLInputElement>document.getElementById('descripcion')).value,
          fecha: new Date(
            (<HTMLInputElement>(
              document.getElementById('fecha')
            )).value
          ),
          autor: (<HTMLInputElement>document.getElementById('autor')).value,
          categoria: (<HTMLInputElement>document.getElementById('categoria')).value,
        };
        return t;
      },
    });

    if (formValues) {
      this.noticiaServicio.add(formValues);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Noticia Registrada',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

}
