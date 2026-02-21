import { Component } from '@angular/core';
import { Profile } from "../profile/profile";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [Profile,],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

}
