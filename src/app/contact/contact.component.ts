import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  userName: string = "";
  userEmail: string = "";
  userSubject: string = "";
  userMessage: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  //function will handle checking if user has input information into input fields
  //if true notify the user their message has been submitted
  //if false alert them that they are missing information
  submitUserMessage() {

    var userAlert: string = "";

    if(this.userName ==  ""){
      userAlert = "You forgot to enter your name!";
    }

    if(this.userEmail ==  ""){
      userAlert += "\nYou forgot to enter your email!";
    }

    if(this.userSubject ==  ""){
      userAlert += "\nYou forgot to enter your message subject!";
    }

    if(this.userMessage ==  ""){
      userAlert += "\nYou forgot to enter your message body!";
    }

    if(this.userName != "" && this.userEmail != "" && this.userSubject != "" && this.userMessage != ""){
      userAlert = "Your message has been submitted successfully!";
    }
    alert(userAlert);
  }

}
