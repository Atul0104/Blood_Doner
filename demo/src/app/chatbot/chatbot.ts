import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewChecked, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  timestamp?: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class Chatbot implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  messages: ChatMessage[] = [];
  isOpen: boolean = true;

  // Comprehensive Q&A Database
  private qaDatabase: { [key: string]: string } = {
    'how can i register as a blood donor?': 'To register as a blood donor:\n\n1. Visit our website and click "Register Now"\n2. Fill in your personal details (name, email, phone, age)\n3. Select your blood group and location\n4. Create a secure password\n5. Submit your information\n\nYou\'ll receive a confirmation via email. After verification, you can schedule your first donation appointment!',
    
    'am i eligible to donate blood?': 'You can donate blood if you meet these criteria:\n\n✓ Age: 18-65 years\n✓ Weight: Minimum 50 kg\n✓ Hemoglobin: 12.5 g/dL or above\n✓ No serious medical conditions\n✓ No communicable diseases\n✓ Not pregnant or breastfeeding\n✓ No recent tattoos or piercings\n\nBefore donation, you\'ll undergo a health screening. Consult our eligibility checker or contact support for personal assessment.',
    
    'how can i find a blood donor?': 'Finding a blood donor is easy!\n\n1. Use our Blood Finder feature:\n   - Click "Blood Finder" on the navbar\n   - Select your blood type\n   - Choose your location\n   - View available donors on the interactive map\n\n2. Direct contact with verified donors\n3. See donor profiles with full contact information\n4. Schedule emergency requests for urgent needs\n\nAll donors are verified and safety-checked.',
    
    'is blood donation safe?': 'Yes! Blood donation is completely SAFE when done at authorized centers.\n\n✓ Use of sterile, single-use needles\n✓ Rigorous screening procedures\n✓ Trained medical professionals\n✓ Post-donation care guidelines\n✓ Quick recovery (minimal side effects)\n\nSide Effects (Rare):\n- Slight dizziness or lightheadedness\n- Minor bruising at needle site\n- Temporary fatigue\n\nYour body replenishes blood within 4-6 weeks. Drink water and avoid strenuous activity for 12-24 hours post-donation.',
    
    'how often can i donate blood?': 'Safe donation frequency depends on blood type:\n\n🩸 Red Blood Cell Donation:\n- Every 56 days (8 weeks) for whole blood\n- Every 40 days for double red cells\n- Males can donate up to 6 times/year\n- Females can donate up to 4 times/year\n\n💙 Plasma Donation:\n- Every 2 weeks (48 hours apart)\n\n🩹 Platelet Donation:\n- Every 3 days (24-hour recovery)\n\nRegular donors help save lives! Maintain a healthy lifestyle between donations.',
    
    'what documents are required for blood donation?': 'Required Documents for Blood Donation:\n\n📋 Identification (ANY ONE):\n- Aadhaar Card\n- Passport\n- Driver\'s License\n- Voter ID\n- PAN Card\n\n📋 Address Proof:\n- Aadhaar\n- Passport\n- Utility bills\n- Rental agreement\n\n📋 Medical History:\n- Previous health records (if available)\n- Current medications list\n- Allergy information\n\nNo specific document is mandatory - we accept any valid government ID. Registration is quick and secure!',
    
    'which blood groups are universal donors?': 'Universal Blood Donor: O Negative (O-)\n\n🩸 Why O- is Universal:\n- Has no A or B antigens\n- Has no Rh antigen\n- Can be given to any blood type\n- Critical in emergencies\n\n🩸 Universal Red Cell Donors:\n- O- (negative) primary\n- O+ (positive) secondary\n\n🩸 Plasma Universal Donors:\n- AB blood type (both + and -)\n\n🩸 Platelet Universal Donors:\n- All blood types acceptable\n\nO- donors are heroes! Only ~6-7% of population has O- blood. If you\'re O-, your donations save countless lives!',
    
    'what are the benefits of blood donation?': 'Benefits of Donating Blood:\n\n💚 For Society:\n- Save up to 3 lives per donation\n- Support emergency situations\n- Help surgery and cancer patients\n- Assist burn and trauma victims\n\n💚 For You (Donor):\n- Free health checkup\n- Health screening results\n- Iron optimization (reduced risk of heart disease)\n- Cardiovascular health improvement\n- Reduced cancer risk\n- Sense of fulfillment and gratitude\n- Join our community of lifesavers\n\n🎁 Rewards Program:\n- Certificate of appreciation\n- Free refreshments after donation\n- Special recognition\n- Priority in scheduling\n\nYou\'re a hero for donating!',
    
    'how can i contact support?': 'Contact Drop of Hope Support:\n\n📞 Helpline: 1-800-BLOOD-HELP (1-800-256-6435)\n📧 Email: support@dropofhope.org\n💬 Live Chat: Available 24/7 on our website\n📍 Visit us: Blood Donation Centers in all major cities\n\n🅘 For Emergencies:\n- Call our Emergency Hotline immediately\n- Specify blood type needed\n- Provide location details\n- Our team responds within 30 minutes\n\nWorking Hours:\n- Monday-Friday: 9 AM - 8 PM\n- Saturday-Sunday: 10 AM - 6 PM\n- Emergencies: 24/7 Support\n\nWe\'re here to help!',
    
    'how to schedule a blood donation appointment?': 'Schedule Your Donation in 3 Easy Steps:\n\n1️⃣ Select a Center:\n   - Visit Blood Finder or our website\n   - Choose nearest donation center\n   - Check available time slots\n\n2️⃣ Book Your Slot:\n   - Pick a convenient date & time\n   - 1-hour slots available throughout the day\n   - Receive confirmation via SMS/Email\n\n3️⃣ Plan Ahead:\n   - Have a light meal 2 hours before\n   - Drink plenty of water\n   - Bring a valid ID\n   - Arrive 10 minutes early\n\n⏱️ Booking Timeline:\n   - Can schedule 1 month in advance\n   - Slots fill quickly during emergencies\n   - Reschedule anytime (24-hour notice)\n\nReady to donate? Book now!',
    
    'what should i do before blood donation?': 'Preparation Guide Before Blood Donation:\n\n24 Hours Before:\n✓ Stay hydrated (drink water regularly)\n✓ Get adequate sleep (7-8 hours)\n✓ Eat iron-rich foods (spinach, chicken, eggs)\n\nDay of Donation:\n✓ Light breakfast 2-3 hours before\n✓ Have a glass of water or juice\n✓ Avoid caffeine\n✓ Wear comfortable, loose clothing\n✓ Bring valid government ID\n✓ Arrive on time\n\nAvoid These:\n✗ Heavy/fatty meals\n✗ Alcohol (24 hours before)\n✗ Strenuous exercise\n✗ Recent tattoos/piercings\n✗ Medications (blood thinners)\n\nFeel prepared? You\'re ready to donate!',
    
    'what should i do after blood donation?': 'Post-Donation Care Guide:\n\n⏱️ Immediately After:\n✓ Rest for 10-15 minutes\n✓ Enjoy refreshments (juice, cookies)\n✓ Hydrate well\n✓ Wait before standing up\n\n📋 First 24 Hours:\n✓ Drink plenty of fluids\n✓ Keep bandage on for 4-6 hours\n✓ Eat iron-rich foods\n✓ Avoid strenuous activities\n✓ No heavy lifting\n✓ Sleep well\n\n📋 Next 48-72 Hours:\n✓ Continue hydration\n✓ Normal diet\n✓ Gentle exercise (walking OK)\n✓ Avoid blood thinners\n\nSide Effects (Rare):\n- Mild dizziness: Lie down for 10 min\n- Bruising: Apply ice packs\n- Fatigue: Rest and hydrate\n\nFeeling good? You\'ve saved lives!'  
  };

  questions: string[] = [
    'How can I register as a blood donor?',
    'Am I eligible to donate blood?',
    'How can I find a blood donor?',
    'Is blood donation safe?',
    'How often can I donate blood?',
    'What documents are required for blood donation?',
    'Which blood groups are universal donors?',
    'What are the benefits of blood donation?',
    'How can I contact support?',
    'How to schedule a blood donation appointment?',
    'What should I do before blood donation?',
    'What should I do after blood donation?'
  ];

  filteredQuestions: string[] = [];
  userInput: string = '';
  showQuestions: boolean = true;
  private shouldScroll: boolean = false;

  constructor() {}

  ngOnInit() {
    // Initialize with greeting message
    this.messages = [
      {
        sender: 'bot',
        text: '👋 Welcome to Drop of Hope! How can I help you today?',
        timestamp: new Date()
      }
    ];
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = 
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  closeChatbot(): void {
    this.isOpen = false;
  }

  filterQuestions(): void {
    const value = this.userInput.toLowerCase();
    if (value.trim() === '') {
      this.filteredQuestions = [];
      return;
    }
    this.filteredQuestions = this.questions.filter(q =>
      q.toLowerCase().includes(value)
    );
  }

  private getBotResponse(userMessage: string): string {
    const message = userMessage.toLowerCase().trim();
    
    // Direct match in database
    for (const [key, value] of Object.entries(this.qaDatabase)) {
      if (message === key) {
        return value;
      }
    }

    // Fuzzy match - check if any key is contained in the message
    for (const [key, value] of Object.entries(this.qaDatabase)) {
      if (message.includes(key.replace(/\?/g, ''))) {
        return value;
      }
    }

    // Default response if no match found
    return 'I\'m not sure about that question. Please try asking about:\n' +
      '• Registration as a blood donor\n' +
      '• Eligibility criteria\n' +
      '• Finding blood donors\n' +
      '• Blood donation safety\n' +
      '• Donation frequency\n' +
      '• Required documents\n' +
      '• Universal blood donors\n' +
      '• Contacting support\n\n' +
      'You can also select from the predefined questions above!';
  }

  sendMessage(message: string): void {
    if (!message || message.trim() === '') return;

    // Add user message
    this.messages.push({
      sender: 'user',
      text: message.trim(),
      timestamp: new Date()
    });

    this.userInput = '';
    this.filteredQuestions = [];
    this.shouldScroll = true;

    // Simulate bot thinking delay and send response
    setTimeout(() => {
      const botResponse = this.getBotResponse(message);
      this.messages.push({
        sender: 'bot',
        text: botResponse,
        timestamp: new Date()
      });
      this.shouldScroll = true;
    }, 500);
  }

  selectSuggestion(q: string): void {
    this.showQuestions = false;
    this.sendMessage(q);
  }

  selectQuestion(q: string): void {
    this.showQuestions = false;
    this.sendMessage(q);
  }
}