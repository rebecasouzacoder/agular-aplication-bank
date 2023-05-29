import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BankService } from './service/bank.service';
import { IBankDetailsResponse } from './service/models/bank-deitals-response';
import { AuthGuardService } from 'src/app/core/guard/auth-guard.service';
import { ModalService } from 'src/app/shared/modal/service/modal.service';
import { IModalData } from 'src/app/shared/modal/service/models/modal-data';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss'],
})
export class BankComponent implements OnInit {
  public form!: FormGroup;
  public idBank!: number;
  public bankDetails!: IBankDetailsResponse;
  public isLoading: boolean = true;
  public dataSourceModal!: IModalData;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: BankService,
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
      } else {
        this.createNewForm();
      }
    });
  }

  createNewForm() {
    this.form = this.formBuilder.group({
      codigo: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(8),
        ],
      ],
      descricao: ['', Validators.compose([Validators.required])],
      status: ['A', Validators.required],
    });
    this.isLoading = false;
  }

  createEditForm() {
    this.form = this.formBuilder.group({
      codigo: [this.bankDetails.codigo, [Validators.required]],
      descricao: [
        this.bankDetails.descricao,
        Validators.compose([Validators.required]),
      ],
      status: [this.bankDetails.status.id, Validators.required],
    });
    this.isLoading = false;
  }

  getBankById() {
    this.service
      .getBankById(this.idBank)
      .subscribe((result: IBankDetailsResponse) => {
        this.bankDetails = result;
        this.createEditForm();
      });
  }

  editBank() {
    this.service.editBank(this.idBank, this.createDto()).subscribe(
      (result: IBankDetailsResponse) => {
        this.initializeComponent();
        this.openModalResponse({
          title: 'Sucesso',
          description: 'Banco editado com sucesso',
          action: false,
        });
      },
      (error) => {
        this.openModalResponse({
          title: 'Error',
          description: 'Houve um erro ao editar o banco',
          action: false,
        });
      }
    );
  }

  createDto() {
    const dto = {
      codigo: this.form.get('codigo')?.value,
      descricao: this.form.get('descricao')?.value,
      id: this.idBank,
      status: {
        descricao: this.form.get('status')?.value === 'A' ? 'ATIVO' : 'INATIVO',
        id: this.form.get('status')?.value,
      },
    };
    return dto;
  }

  createBank() {
    this.service.createBank(this.createDto()).subscribe(
      (result: IBankDetailsResponse) => {
        this.openModalResponse({
          title: 'Sucesso',
          description: 'Banco cadastrado com sucesso!',
          action: false,
        });
        this.router.navigate([`dashboard/bank/${result.id}`]);
      },
      (error) => {
        this.openModalResponse({
          title: 'Error',
          description: 'Houve um erro ao cadastrar o banco!',
          action: false,
        });
      }
    );
  }

  close() {
    this.router.navigate([
      this.idBank ? `dashboard/bank-details/${this.idBank}` : 'dashboard/home',
    ]);
  }

  openModalResponse(dto: IModalData) {
    this.dataSourceModal = dto;
    this.modalService.openModal();
  }
}
