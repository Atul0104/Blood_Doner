import { Route, Routes } from '@angular/router';

import { HammerModule } from '@angular/platform-browser';

import { Footer } from './footer/footer';
import { Register } from './register/register';
import { HealthCheck } from './health-check/health-check';
import { Donationday } from './donationday/donationday';
import { Rough } from './rough/rough';
import { SearchDonar } from './search-donar/search-donar';
import { DonorEligibility } from './donor-eligibility/donor-eligibility';
import { RegisterNow } from './register-now/register-now';
import { Details } from './details/details';
import { Product } from './product/product';
import { JoinTeam } from './join-team/join-team';
import { Locations } from './locations/locations';
import { DonateNow } from './donate-now/donate-now';
import { ABOUT } from './about/about';
import { GETINVOLVED } from './get-involved/get-involved';

import { ThankYou } from './thank-you/thank-you';
import { HOME } from './home/home';
import { ShareNow } from './share-now/share-now';
import { SignUp } from './sign-up/sign-up';
import { JoinVolunteer } from './join-volunteer/join-volunteer';
import { ContactComponent } from './contact/contact';
import { Chatbot } from './chatbot/chatbot';
import { BloodFinder } from './components/blood-finder/blood-finder';
import { AdminVerificationComponent } from './components/admin-verification/admin-verification.component';
import { Profile } from './pages/profile/profile';
import { UserAuth } from './services/user-auth';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';
import { ViewDonors } from './view-donors/view-donors';
import { PostBloodRequest } from './post-blood-request/post-blood-request';
import { HospitalDashboard } from './hospital-dashboard/hospital-dashboard';
import { NGODashboard } from './ngo-dashboard/ngo-dashboard';



export const routes:Routes=[ 
    {path:'',redirectTo:'home', pathMatch:'full' },
    { path: 'chatbot', component: Chatbot },
    { path: 'blood-finder', component: BloodFinder },
    {path:'about', component:ABOUT},
    {path:'home',component:HOME},
    {path:'contact',component:ContactComponent},
    {path:'get-involved',component:GETINVOLVED},
    {path:'footer',component:Footer},
    {path:'register', component: Register ,canActivate:[authGuard]},
    {path:'health-check', component: HealthCheck },
    {path:'donation-day', component: Donationday},
    {path:'rough',component:Rough},
    {path:'Join-team',component:JoinTeam},
    {path:'Search-Donor',component:SearchDonar},
    {path:'donar-eligiblity',component:DonorEligibility},
    {path:'Register-now',component:RegisterNow},
    {path:'Locations',component:Locations},
    {path:'Donate-now',component:DonateNow, canActivate: [authGuard]},
    {path:'details/:id',component:Details},
    {path :'product',component:Product},
    {path:'thank-you',component:ThankYou},
    {path:'share-now',component:ShareNow},
    {path:'sign-up',component:SignUp},
    {path:'join-volunteer',component:JoinVolunteer},
    {path:'admin/verify-donors',component:AdminVerificationComponent},
    { path: 'ngo-dashboard', component: NGODashboard },

{ path: 'hospital-dashboard', component: HospitalDashboard},

{ path: 'post-request', component: PostBloodRequest },

{ path: 'view-donors', component: ViewDonors },
  
  {
  path: 'certificate',
  loadComponent: () =>
    import('./components/certificate/certificate.component')
      .then(m => m.CertificateComponent)
}, 
 { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'profile', component: Profile, canActivate: [authGuard] }
];






