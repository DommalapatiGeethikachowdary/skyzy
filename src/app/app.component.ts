import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ChatbotService, Message } from './layout/chatbot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isPopupVisible: boolean=true;
  isVisible: boolean=false;
  datetime: any;
  value: string; 
   messages: Message[] = [];
  constructor(private router: Router,private chatbot:ChatbotService) {}
ngOnInit(): void {
  
  this.chatbot.conversation.subscribe((val) => {
    // this.datetime = moment(new Date()).format('HH:mm:ss');
    this.messages = this.messages.concat(val);
    setTimeout(() => {
      this.scrollToBottom();
    }, 0);
  });
}
  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once logged out, you will need to log in again to access the application.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform logout logic here (e.g., clear user session)
        // For example, if you use local storage to store the user session:
        localStorage.removeItem('userSession');

        // Redirect to login page
        this.router.navigate(['/login']);
      }
    });
  }

  
  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
    this.isVisible = true;
  }

  togglePopups() {
    this.isVisible = !this.isVisible;
    this.isPopupVisible = true;
  }



  getPassedData(event: any) {
    // Your event handling code here
  }

  geturl(link: string) {
    window.open(link, '_blank');
  }
  // config: Config;
  // toggle(index: number, data, name) {
  //   let number=1;
  //   let number1=2

  //   let value=number + number1;
  //   console.log(value);
    
  //   if (!data.new_url) {
  //     if (name == 'main') {
  //       this.menuData
  //         .filter((menu, i) => i !== index && menu.active)
  //         .forEach(menu => (menu.active = !menu.active));
  //       this.menuData[index].active = !this.menuData[index].active;
  //     } else {
  //       this.router.navigate([data.new_url]);

  //       this.isVisible = !this.isVisible;
  //       this.isPopupVisible = true;
  //     }
  //   }
  //   else {
  //     this.router.navigate([data.new_url]);

  //     this.isVisible = !this.isVisible;
  //     this.isPopupVisible = true;

  //   }
  // }
  sendMessage() {
    // this.datetime = moment(new Date()).format('HH:mm:ss');


    console.log(this.value,">>>>>>>>>>>>>>>>>>>>");
    
    this.chatbot.getBotAnswer(this.value);
    this.value = '';
    setTimeout(() => {
      this.scrollToBottom();
    }, 0);
  }

  scrollToBottom(): void {
    try {
      // this.chatbot.nativeElement.scrollTop = this.chatbot.nativeElement.scrollHeight;
    } catch (err) { }
  }
}


