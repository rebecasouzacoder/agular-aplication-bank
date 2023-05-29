import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ModalService } from "./service/modal.service";
import { IModalData } from "./service/models/modal-data";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent {
  showModal!: boolean;
  @Input() dataSource!: IModalData;
  @Output() confirmAction: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.showModal.subscribe((show) => this.showModal = show);
  }

  close() {
    this.modalService.closeModal();
  }

  confirmation() {
    this.confirmAction.emit(true)
    this.modalService.closeModal();
  }

}