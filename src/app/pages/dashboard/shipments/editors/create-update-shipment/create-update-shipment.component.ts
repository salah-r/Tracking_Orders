import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ShipmentService } from '../../service/shipment.service';
import { Password } from 'primeng/password';
@Component({
  selector: 'app-create-update-shipment',
  templateUrl: './create-update-shipment.component.html',
  styleUrls: ['./create-update-shipment.component.scss']
})
export class CreateUpdateShipmentComponent {
  @Output() closeDialog = new EventEmitter<boolean>();
  @Input('mainShipment') mainShipment: any;
  @Input('shipmentDailogueValue') shipmentDailogueValue!: boolean;
  @Output('userDialog') userDialog = new EventEmitter<boolean>();
  @Output('UpdateData') UpdateData = new EventEmitter<boolean>();


  visible: boolean = true;  // Add this property
  diffrentPass: boolean;
  viewPass: boolean = true;
  passwordError: string = '';
  shippingStatus = [ { label: 'قيد الانتظار', value: 0 },       
  { label: 'قيد التقدم', value: 1 },         
  { label: 'في النقل', value: 2 },           
  { label: 'في الجمارك', value: 3 },         
  { label: 'خرج للتسليم', value: 4 },        
  { label: 'تم التسليم', value: 5 },         
  { label: 'متأخرة', value: 6 },             
  { label: 'ملغية', value: 7 }              
  ]



  constructor(
    private shipmentService: ShipmentService,
    private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.setFormValues();
    if (this.mainShipment != null) {
      this.viewPass = false
    }

    document.addEventListener('keydown', this.handleEscapeKey.bind(this));
  }

  handleEscapeKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.onClose();
    }
  }

  onClose() {
    this.visible = false;
    this.userDialog.emit(false);
  }



  mainShipmentForm = this.fb.group({
    // trackingNumber: ['', Validators.required],
    status: ['',],
    expectedDeliveryDate: ['', Validators.required],
    destination: ['',],

  });


  convertTimeFormat(inputTime: string): string {
    // Parse the input time
    const date = new Date(inputTime);

    date.setHours(19, 56, 24, 537);

    return date.toISOString();
  }

  // get trackingNumber() {
  //   return this.mainShipmentForm.get('trackingNumber');
  // }
  get status() {
    return this.mainShipmentForm.get('status');
  }
  get expectedDeliveryDate() {
    return this.mainShipmentForm.get('expectedDeliveryDate');
  }
  get destination() {
    return this.mainShipmentForm.get('destination');
  }


  setFormValues() {

    this.mainShipmentForm.patchValue({
      // password: this.user?.password || '',
      destination: this.mainShipment?.destination || '',
      expectedDeliveryDate: this.mainShipment?.expectedDeliveryDate || '',
      // trackingNumber: this.mainShipment?.trackingNumber || '',
      status: this.mainShipment?.status || '',
    });
  }

  saveUser() {
    console.log(this.mainShipmentForm.value);
    console.log(new Date(this.expectedDeliveryDate.value).toISOString());
    const convertedTime = this.convertTimeFormat(this.expectedDeliveryDate.value);
    console.log(convertedTime);

    let status: any = this.status.value
    console.log(status);



    if (this.mainShipmentForm.valid) {
      const cerateBody = {
        mainShipmentDto: {
          expectedDeliveryDate: convertedTime,
          status: status.value,
        },
        destination: this.destination.value,
      };
      if (this.mainShipment != null) {
        this.viewPass = false

        const editBody = {
          expectedDeliveryDate: convertedTime,
          status: status.value,
          destination: this.destination.value,
          // trackingNumber: this.trackingNumber.value,
        };
        // update func
        this.shipmentService.editMainShipment(this.mainShipment.id, editBody).subscribe({
          next: (res) => {
            console.log(res);

            this.UpdateData.emit(true);
            this.userDialog.emit(false);
            this.shipmentDailogueValue = false;

            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Shipment Updated',
              life: 3000,
            });
          },
          error: (err) => {
            console.log(err);
          },
        });

        // add func
      }
      else {
        this.viewPass = false


        this.shipmentService.addMainShipment(cerateBody).subscribe({
          next: (res: any) => {
            console.log(res);
            this.UpdateData.emit(true);
            this.userDialog.emit(false);
            this.shipmentDailogueValue = false;

            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Shipment Created',
              life: 3000,
            });
          },
          error: (err) => {
            console.log(err)

          }
        });
      }
    }

    this.mainShipment = null;
  }
}

