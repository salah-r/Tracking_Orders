import { Component, OnInit, ViewChild } from '@angular/core';
import { Isub } from 'src/app/interfaces/isub';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ShipmentService } from '../../../shipments/service/shipment.service';
import { Router } from '@angular/router';
import { AccountService } from '../../../accounts/sevice/account.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-shipment-details',
  templateUrl: './view-shipment-details.component.html',
  styleUrls: ['./view-shipment-details.component.scss']
})
export class ViewShipmentDetailsComponent {

  shippingStatus = [{ label: 'Pending', value: 0 }, { label: 'InProgress', value: 1 },
  { label: 'InTransit', value: 2 }, { label: 'AtCustoms', value: 3 },
  { label: 'OutForDelivery', value: 4 }, { label: 'Delivered', value: 5 },
  { label: 'Delayed', value: 6 }, { label: 'Cancelled', value: 7 },
  ]

  shipments: any[];
  subscription: Isub;
  subscriptionDiaglog: boolean = false;
  extraShipment: boolean = false;
  statusUpdateDialog: boolean = false;
  @ViewChild('dt') dt: Table;
  sub: string = '';
  deleteExtra: boolean = false;
  mainShipment: any;
  visible: boolean;
  destination: any;
  cancelReason: any;
  updatedExtraShipment: any;
  selectedID: any;
  usersList: any;
  parentShipment: any;
  placeholder: any = 'العميل';
  filteredShipments: any[] = [];
  selectedStatus: any;
  place: any;
  notes: any;
  editedShipment: any;
  mainShimpentStatusUpdateDialog: boolean;
  selectedDate: any;
  showStatusValue: boolean;
  shownStatus: any;

  constructor(
    private shipmentService: ShipmentService,
    private router: Router,
    private fb: FormBuilder,

    private confirmationService: ConfirmationService,
    private accountService: AccountService,
    private messageService: MessageService

  ) { }

  ngOnInit(): void {

    this.getShipmentsDetails()
    // this.getMainShipmentData()
    this.getAllUsers()
    // this.getAllSub();
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

  getShipmentsDetails() {
    const savedData = localStorage.getItem('shipmentData');
    if (savedData) {
      this.shipmentService.setShipmentData(JSON.parse(savedData));
    }

    this.mainShipment = JSON.parse(savedData)

    console.log(this.mainShipment);

    this.shipments = this.mainShipment.customerShipments
    this.filteredShipments = this.shipments

  }

  getShipmentsDetails2() {
    this.shipmentService.getMainShipmentById(this.mainShipment.id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.mainShipment = res
        localStorage.setItem('shipmentData', JSON.stringify(res))
        this.shipments = res.customerShipments
        this.filteredShipments = this.shipments
      }
    })

    // console.log(this.mainShipment);


  }


  getStatus(event: any) {
    console.log(event.value);
    this.selectedStatus = event.value.value
    console.log(this.selectedStatus);
  }
  showStatus(status: any) {
    this.showStatusValue = true
    this.shownStatus = status
  }



  setFormValues(shipment: any) {
    this.placeholder = `id : ${shipment.customerId}`
    console.log(this.placeholder);
    this.extraShipment = true
    this.editedShipment = shipment



    this.extraShipmentForm.patchValue({
      // password: this.user?.password || '',
      deliveryAddress: shipment?.deliveryAddress || '',
      customerId: shipment?.customerId || '',

    });
  }
  saveExtraShipment() {
    console.log(this.extraShipmentForm.value);

    if (this.extraShipmentForm.valid) {

      const cerateBody = {
        deliveryAddress: this.deliveryAddress.value,
        customerId: this.selectedID
      };


      if (this.editedShipment) {
        // method to edit on extea
        console.log("edit");

        // this.shipmentService

      }
      else {

        this.shipmentService.addExtraShipment(cerateBody, this.parentShipment.id).subscribe({
          next: (res: any) => {
            console.log(res.data);

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
  }

  closeDialogue() {

    this.showStatusValue = false
    this.statusUpdateDialog = false
    this.visible = false
    this.deleteExtra = false
    this.extraShipment = false
    this.mainShimpentStatusUpdateDialog = false

  }

  openMainShimentStatusDialoge(mainShipment: any) {
    this.mainShimpentStatusUpdateDialog = true;
    this.mainShipment = mainShipment
  }

  showDestinationDialog(shipment: any, id?: any) {
    this.visible = true;
    if (id == 2) {
      this.destination = shipment.customerId
    } else if (id == 3) {
      this.destination = shipment.deliveryAddress
    }

    else {

      this.destination = shipment.destination
    }
  }

  goBack() {
    this.router.navigate(['/shipments'])
  }

  cancelExtraShipment(id: any) {
    let body = {}
    this.shipmentService.deleteExtraShipment(id, this.cancelReason, body).subscribe({
      next: (res: any) => {
        console.log(res);
        this.deleteExtra = false
        this.getShipmentData()
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  deleteExtraShipment(shipment: any) {
    let body = {}
    this.cancelReason = 'Delete Extra Shipment'
    this.confirmationService.confirm({
      message:
        'هل متأكد من مسح الاشتراك ' +
        shipment.trackingNumber +
        ' ?',
      header: 'مسح',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.shipmentService.deleteExtraShipment(shipment.id, this.cancelReason, body).subscribe({
          next: (res: any) => {
            console.log(res);
            this.deleteExtra = false
            this.getShipmentData()

          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }


  searchOnExtras(event: any) {


    this.filteredShipments = this.shipments.filter(ele => {
      return String(ele.trackingNumber).toLowerCase().includes(event.target.value.toLowerCase());
    })

    if (event.target.value == '') {
      this.filteredShipments = this.shipments
    }

  }

  getTrackedShipments(trackingNumber: any) {
    this.shipmentService.checkShipmentNumber(trackingNumber).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res != null) {
          this.filteredShipments = res
        }
        else {
          console.log('forbidden request');
        }

      },
      error: (err: any) => {
        console.log(err);


      }
    })
  }

  getShipmentData() {
    this.shipmentService.getMainShipmentById(this.mainShipment.id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.mainShipment = res
        this.shipments = this.mainShipment.customerShipments
        this.filteredShipments = this.shipments

      },
      error: (err: any) => {
        console.log(err);

      }
    })
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


  updateExtraShipmentStatus() {

    let body = {
      location: this.place,
      notes: this.notes,
      status: this.selectedStatus,
    }

    this.shipmentService.updateExstraStatus(this.updatedExtraShipment.id, body).subscribe({
      next: (res: any) => {
        console.log(res);
        this.statusUpdateDialog = false
        this.getShipmentsDetails2()
      },
      error: (err: any) => {
        console.log(err);

      }
    })


  }


  updateMainshipmentStatus() {


    let Body = {

      location: this.place,
      notes: this.notes,
      status: this.selectedStatus

    }
    this.shipmentService.updateMainShipmentStatus(this.mainShipment.id, Body).subscribe({
      next: (res: any) => {

        console.log(res)
      },
      error: (err: any) => {
        console.log(err);

      }
    });
  }








  openNew() {
    this.subscription = null;
    this.subscriptionDiaglog = true;
  }


  openExtraDialoge(mainShipment: any) {
    this.extraShipment = true;
    this.parentShipment = mainShipment
  }
  openStatusDialoge(shipment: any) {
    this.statusUpdateDialog = true;
    this.updatedExtraShipment = shipment
  }
  openDeleteExtraDialoge(shipment: any) {
    this.deleteExtra = true;
    this.updatedExtraShipment = shipment


  }




}





