import { Component, OnInit } from '@angular/core';
import { HomeService } from './service/home.service';
import { IListBank } from './service/models/list-bank-response';
import { AuthGuardService } from 'src/app/core/guard/auth-guard.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/modal/service/modal.service';
import { IModalData } from 'src/app/shared/modal/service/models/modal-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public listBank!: IListBank;
  public paginator!: Number[];
  public searchInput!: string;
  public dataSourceModal!: IModalData;
  public selectedBank: Number[] = [];

  itemsPerPage = 10;
  pageNumber = 0;
  totalPages = 0;

  constructor(
    private service: HomeService,
    private authService: AuthGuardService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getBank();
  }

  nextPage() {
    if (this.pageNumber < this.totalPages - 1) {
      this.pageNumber += 1;
      this.getBank(this.searchInput, this.pageNumber);
    }
  }

  prevPage() {
    if (this.pageNumber > 0) {
      this.pageNumber -= 1;
      this.getBank(this.searchInput, this.pageNumber);
    }
  }

  getBank(pesquisa?: string, pageNumber = 0, pageSize = 10) {
    this.service
      .getBank(pesquisa, pageNumber, pageSize)
      .subscribe((result: IListBank) => {
        this.listBank = result;
        this.totalPages = result.totalPages;
        this.pageNumber = result.pageable.pageNumber;
      });

    return this.listBank;
  }

  changeSelected() {
    const banksSelected = this.listBank.content
      .filter(({ selected }) => selected)
      .map(({ id }) => id);
    this.selectedBank = banksSelected;
  }

  async clickDeleteBank(): Promise<void> {
    this.openModal(this.selectedBank.length);
  }

  confirmationDelete() {
    this.service.deleteBank(this.selectedBank).subscribe(
      (result) => {
        this.openModalResponse({
          title: 'Sucesso',
          description: 'Exclusão realizada com sucesso',
          action: false,
        });
        this.getBank();
      },
      (error) => {
        this.openModalResponse({
          title: 'Erro',
          description: 'Houve um erro ao  realizar a exclusão',
          action: false,
        });
        this.getBank();
      }
    );
  }

  verifyPermission(permission: string) {
    return this.authService.Permission.includes(permission);
  }

  clickDetails(id: number) {
    this.router.navigate([`dashboard/bank-details/${id}`]);
  }

  createBank() {
    this.router.navigate(['dashboard/bank']);
  }

  openModal(qtd: number) {
    this.dataSourceModal = {
      title: 'Confirmação de Exclusão',
      description: `Confirma a exclusão de ${qtd} registro(s) selecionados`,
      action: true,
    };
    this.modalService.openModal();
  }

  openModalResponse(dto: IModalData) {
    this.dataSourceModal = dto;
    this.modalService.openModal();
  }
}
