import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageService } from './services/image.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'cornerstone-angular17';

  imageService = inject(ImageService);
}
