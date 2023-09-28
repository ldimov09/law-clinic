import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from '../case.service';
import { ICase } from 'src/app/interfaces/case';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from 'src/app/interfaces/user';
import { DialogSpecialtyComponent } from 'src/app/admin/dialog-specialty/dialog-specialty.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
loggedUser!:IUser;
  id: string = this.activatedRoute.snapshot.params?.['id'];
  users!:IUser[]
  user!:IUser;
  cases!:ICase[];
  case!:ICase;
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private caseService: CaseService,private snackBar: MatSnackBar,public dialog: MatDialog, private authService: AuthService) {}
  
  ngOnInit() {
   
   this.loggedUser = this.authService.user
   
   
   this.authService.getAllUsers().subscribe({
     next: (response: any) => {
       console.log(response);
       
       if (response.success) {
         this.users = response.result;
     
      
         for (const us of this.users) {
          console.log(us.id);
          
           if(us.id == this.case?.guest_id){
             this.user = us
             console.log(this.user)
           }
          
           
         }
   
       }
        
       
   
       
     },
     error: (error: string) => {
     },
   });
      this.caseService.getAllCases().subscribe({
			next: (response: any) => {
				if (response.success) {
					this.cases = response.result;
       console.log(this.case);
       
          for (const e of this.cases) {
            if(e.id == this.activatedRoute.snapshot.params?.['id']){
              this.case = e
      if(this.case.status == 'Working'){
this.case.status='Работи се'
      }
      if(this.case.status == 'Rejected'){
        this.case.status='Отхвърлено'
              }
              if(this.case.status == 'Done'){
                this.case.status='Завършено'
                      }
            }
           
          
          }
          console.log(this.case);
          
          

        }
         
        

        
			},
			error: (error: string) => {
			},
		});
    
    
  }
  openSpecilatyDialog(id: number): void {
		const dialogRef = this.dialog.open(DialogSpecialtyComponent, {
			data: { selected: "" }, // Selected is <empty string> for the dialog to fill in the selected option
		});
  }
  openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action);
	}
    changeCaseStatus(id: number, status: string, specialty?: string | number) {
      let oldStatus: string, oldSpec: string | number, index: number; //Saving the old status and specialty in case something goes wrong with the request
      this.cases = this.cases.map((c, i) => { //Making an optimistic update: Updating the approved field for the user to see instantly before even sending the request.
        if (c.id == id) {
          oldStatus = c.status;
          oldSpec = c.specialty;
          c.status = status;
          c.specialty = specialty!;
          index = i
        }
        return c;
      })
      this.caseService.changeStatus(id, status, specialty).subscribe({
        next: (response: any) => {
          if (!response.success) {
            this.cases[index].status = oldStatus; //If something goes wrong restore the previous status and specialty.
            this.cases[index].specialty = oldSpec;
          }else{
            this.openSnackBar('Успешно променен статус!', 'OK')
          }
        },
        error: (error: any) => {
          this.cases[index].status = oldStatus; //If something goes wrong restore the previous status and specialty.
          this.cases[index].specialty = oldSpec;
          console.log(error);  //TODO: Handle errors properly
        }
      })
    }
  
  
  
}

