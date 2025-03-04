import { Component } from '@angular/core';
import { TutorialService } from '../../services/tutorial/tutorial.service';
import { Tutorial } from '../../models/tutorial.model';

@Component({
  selector: 'app-tutorial-list',
  standalone: false,
  templateUrl: './tutorial-list.component.html',
  styleUrl: './tutorial-list.component.css',
})
export class TutorialListComponent {
  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll().subscribe({
      next: (data) => {
        this.tutorials = data;
        console.log(data);
      },
      error: (e) => console.log(e),
    });
  }
  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll().subscribe({
      next: (res) => {
        this.refreshList();
        console.log(res);
      },
      error: (e) => console.log(e),
    });
  }
  searchTitle(): void {
    this.currentTutorial = {};
    this.currentIndex = -1;

    this.tutorialService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.tutorials = data;
        console.log(data);
      },
      error: (e) => console.log(e),
    });
  }
}
