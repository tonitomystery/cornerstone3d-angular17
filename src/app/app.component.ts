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

  // file = File;

  imageService = inject(ImageService);

  onChange(event: any) {
    event.stopPropagation();
    event.preventDefault();

    const files = event.target.files;
    this.proccessFile(files[0]);
  }

  async proccessFile(file: File) {
    const imageId = this.imageService.getImageIdFromFile(file);

    let dataSet = await this.imageService.loadImage(imageId);
    let patientName = dataSet.data.string('x00100010');
    console.log('🚀 ~ AppComponent ~  patientName:', patientName);
  }
}
