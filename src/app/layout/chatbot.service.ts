import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class Message {
  constructor(public author: string, public content: string) { }
}
@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  authtoken: boolean = localStorage.getItem('isLoggedin')=='true' ? true : false
  conversation = new Subject<Message[]>();
  constructor() { }
  messageMap:any = {
    "Hi": "Hello",
    "Who are you": "My name is Test Sat Bot",
    "What is your role": "Just guide for the user",
    "defaultmsg": "I can't understand your text. Can you please repeat",
    "bye":  "ok see you later",
    "What's your name?": "skyzy",
    "What services do you provide?": "any thing you want",
    "hello": "bye"

  }
  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg);
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));
    setTimeout(() => {
      this.conversation.next([botMessage]);
    }, 1500);
  }
  getBotMessage(question: string) {
    let answer = this.messageMap[question];
    return answer || this.messageMap['defaultmsg'];
  }
}
