import { Component, OnInit } from '@angular/core';
import { BankService } from '../service/bank.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IBankDetailsResponse } from '../service/models/bank-deitals-response';
import { AuthGuardService } from 'src/app/core/guard/auth-guard.service';
import { ModalService } from 'src/app/shared/modal/service/modal.service';
import { IModalData } from 'src/app/shared/modal/service/models/modal-data';

@Component({
  selector: 'app-bank',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss'],
})
export class BankDetailsComponent implements OnInit {
  public bankDetails!: IBankDetailsResponse;
  public idBank!: number;
  public dataSourceModal!: IModalData;

  constructor(
    private service: BankService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthGuardService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.initializeComponent();
  }

  initializeComponent() {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.idBank = Number(params.get('id'));
        this.getBankById();
      }
    });
  }

  getBankById() {
    this.service
      .getBankById(this.idBank)
      .subscribe((result: IBankDetailsResponse) => {
        this.bankDetails = result;
      });
  }

  close() {
    this.router.navigate(['dashboard/home']);
  }

  deleteBank() {
    this.service.deleteBankById(this.idBank).subscribe(
      (result) => {
        this.openModalResponse({
          title: 'Sucesso',
          description: 'Exclusão realizada com sucesso',
          action: false,
        });
        setTimeout(() => {
          this.router.navigate(['dashboard/home'])
        }, 3000);

      },
      (error) => {
        this.openModalResponse({
          title: 'Erro',
          description: 'Houve um erro ao  realizar a exclusão',
          action: false,
        });
      }
    );
  }

  openModalConfirm() {
    this.dataSourceModal = {
      title: 'Confirmação de Exclusão',
      description: 'Confirma a exclusão do registro ?',
      action: true,
    };
    this.modalService.openModal();
  }

  openModalResponse(dto: IModalData) {
    this.dataSourceModal = dto;
    this.modalService.openModal();
  }

  editBank() {
    this.router.navigate([`dashboard/bank/${this.idBank}`]);
  }

  verifyPermission(permission: string) {
    return this.authService.Permission.includes(permission);
  }
}
