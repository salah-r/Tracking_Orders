import { Component, OnInit, ViewChild } from '@angular/core';
import { Isub } from 'src/app/interfaces/isub';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ShipmentService } from '../../service/shipment.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../../accounts/sevice/account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-all-shipments',
  templateUrl: './view-all-shipments.component.html',
  styleUrls: ['./view-all-shipments.component.scss']
})
export class ViewAllShipmentsComponent {

shippingStatus = [
  { label: 'قيد الانتظار', value: 0 },       
  { label: 'قيد التقدم', value: 1 },         
  { label: 'في النقل', value: 2 },           
  { label: 'في الجمارك', value: 3 },         
  { label: 'خرج للتسليم', value: 4 },        
  { label: 'تم التسليم', value: 5 },         
  { label: 'متأخرة', value: 6 },             
  { label: 'ملغية', value: 7 }               
];
  shipments: any[];
  mainShipment: any;
  shipmentDailogue: boolean = false;
  extraShipment: boolean = false;
  statusUpdateDialog: boolean = false;
  @ViewChild('dt') dt: Table;
  sub: string = '';
  visible: boolean = false;
  destination: any;
  arrivedDate: any
  notes: any
  place: any
  updatedMainShipment: any;
  usersList: any[] = [];
  selectedID: any;
  selectedStatus: any;
  mainShimpentStatusUpdateDialog: boolean;
  filtersList: any[] = ['الموقع', 'رقم الشحنة',]
  filtringMethod: any;
  filteredShipments: any[];
  token: any = localStorage.getItem('auth_token');


  constructor(
    private confirmationService: ConfirmationService,
    private shipmentService: ShipmentService,
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {


  }

  ngOnInit(): void {
    // document.addEventListener('keydown', this.handleEscapeKey.bind(this));
    this.getAllMainShipments()
    this.getAllUsers()

  }

  getUserID(event) {
    console.log(event.value);
    this.selectedID = event.value.id

  }

  getAllUsers() {
    this.accountService.getAllUsers().subscribe({
      next: (resposnse) => {
        console.log(resposnse);

        this.usersList = resposnse;
        // console.log(this.users);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  getFilterMethod(event: any) {
    // console.log(event.value);
    this.filtringMethod = event.value

  }


  onMainShipmentFiter(event: any) {
    // console.log(event.target.value);



    if (this.filtringMethod == 'الموقع') {

      this.filteredShipments = this.shipments.filter((ele: any) => {
        return String(ele.destination).toLowerCase().includes(event.target.value.toLowerCase());
      })
    }

    else if (this.filtringMethod == 'رقم الشحنة') {

      this.filteredShipments = this.shipments.filter((ele: any) => {
        return String(ele.trackingNumber).toLowerCase().includes(event.target.value.toLowerCase());
      })

    }




    if (event.target.value == '') {
      this.filteredShipments = this.shipments
    }



  }





  getStatus(event: any) {
    console.log(event.value);
    this.selectedStatus = event.value.value
    console.log(this.selectedStatus);
  }

  updateMainshipmentStatus() {

    let body = {
      location: this.place,
      notes: this.notes,
      status: this.selectedStatus,
      mainShipmentId: this.updatedMainShipment.id
    }

    this.shipmentService.updateStatus(this.updatedMainShipment.id, body).subscribe({
      next: (res: any) => {
        console.log(res);
        this.statusUpdateDialog = false
        this.getAllMainShipments()
      },
      error: (err: any) => {
        console.log(err);

      }
    })


  }

  extraShipmentForm = this.fb.group({


    deliveryAddress: ['', Validators.required],
    customerId: ['', Validators.required],

  });

  get deliveryAddress() {
    return this.extraShipmentForm.get('deliveryAddress');
  }
  get customerId() {
    return this.extraShipmentForm.get('customerId');
  }


  saveExtraShipment() {
    console.log(this.extraShipmentForm.value);

    if (this.extraShipmentForm.valid) {
      const cerateBody = {
        mainShipmentId: this.updatedMainShipment.id,

        deliveryAddress: this.deliveryAddress.value,
        customerId: this.selectedID
      };



      this.shipmentService.addExtraShipment(cerateBody, this.updatedMainShipment.id).subscribe({
        next: (res: any) => {
          console.log(res.data);
          this.getAllMainShipments()
          this.closeExtraDialoge()

          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'ExtraShipment Created',
            life: 3000,
          });
        },
        error: (err: any) => {
          console.log(err);

        },


      });


    }
  }



  getAllMainShipments() {
    this.shipmentService.getAllMainShipments(this.token).subscribe({
      next: (resposnse) => {
        this.shipments = resposnse;
        console.log(this.shipments);
        this.filteredShipments = this.shipments
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  showDestinationDialog(shipment: any) {
    this.visible = true;
    this.destination = shipment.destination
  }

  changeDialogStatus(dialogStatus: any) {
    this.shipmentDailogue = dialogStatus;
  }

  updateShipmentsData(updatedData: any) {
    if (updatedData) {
      this.getAllMainShipments();
    }
  }


  deleteMainShipment(shipment: any) {
    console.log(shipment.id);
    let data = {
      mainShipmentId: shipment.id,
      notes: "cancelled",
      Destination: shipment.destination,
      status: 7
    }
    this.confirmationService.confirm({
      message:
        'هل متأكد من مسح الشحنة ' +
        shipment.trackingNumber +
        ' ?',
      header: 'مسح',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.shipmentService
          .editMainShipment(shipment.id, data)
          .subscribe({
            next: (resposnse) => {
              console.log(resposnse);
              this.shipments = this.shipments.filter((values) => {
                values.id !== shipment.id;
              });
              this.mainShipment = null;
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'تم مسح الشحنة ',
                life: 3000,
              });

              this.getAllMainShipments();
            },
            error: (err) => {
              console.log(err);
            },
          });
      },
    });
  }



  goToExtraShipment(mainShipment: any) {
    this.shipmentService.setShipmentData(mainShipment)
    localStorage.setItem('shipmentData', JSON.stringify(mainShipment));

    this.router.navigate(['/shipment-details']);
  }


  editMainShipment(mainShipment: any) {
    this.mainShipment = { ...mainShipment };
    this.shipmentDailogue = true;
  }


  hideDialog(event: any) {
    this.shipmentDailogue = event;
  }

  openNew() {
    this.mainShipment = null;
    this.shipmentDailogue = true;
  }

  openExtraDialoge(mainShipment: any) {
    this.extraShipment = true;
    this.updatedMainShipment = mainShipment
  }






  closeExtraDialoge() {
    this.extraShipment = false;

  }
  openStatusDialoge(mainShipment: any) {
    this.statusUpdateDialog = true;
    this.updatedMainShipment = mainShipment
    // console.log(this.updatedMainShipment);


  }

  closeStatusDialoge() {
    this.statusUpdateDialog = false;

  }


  // updateShipmentStatus() {
  //   // console.log(this.updatedMainShipment);
  //   let MainShipment = this.updatedMainShipment

  //   const Body = {
  //     location: this.place,
  //     mainShipmentId: MainShipment.id,
  //     notes: this.notes,
  //   }

  //   console.log(Body);


  //   this.shipmentService.updateStatus(MainShipment.id, Body).subscribe({
  //     next: (res: any) => {
  //       console.log(res);
  //       this.statusUpdateDialog = false


  //     },
  //     error: (err: any) => {
  //       console.log(err);

  //     }
  //   })
  // }

  // onSearchInputChange(event: Event) {
  //   if (this.dt) {
  //     this.sub = (event.target as HTMLInputElement).value;
  //     this.dt.filterGlobal(this.sub, 'contains');
  //   }
  // }

  // clearSearch(table: Table) {
  //   table.clear();
  //   this.sub = '';
  // }
}




