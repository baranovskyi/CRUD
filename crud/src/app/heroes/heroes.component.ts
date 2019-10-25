import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(
    private heroService: HeroService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getAllHeroes().subscribe((response: Hero[]) => {
      this.heroes = response;
    })
  }

  add(name: string): void {
    this.heroService
    .addHero(name)
    .subscribe(hero => {
    this.heroes.push(hero as Hero)
  });
  }

  delete(hero: Hero): void {
    this.heroService
  .deleteHero(hero._id)
  .subscribe(() => {
    let index = this.heroes.indexOf(hero as Hero);
    this.heroes.splice(index, 1)
  });
  }
}