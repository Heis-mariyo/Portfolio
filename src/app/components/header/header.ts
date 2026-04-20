import { Component, OnDestroy, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  isScrolled = false;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly router = inject(Router);
  private navigationSubscription?: Subscription;

  private readonly onScroll = () => {
    this.isScrolled = window.scrollY > 14;
  };

  private readonly onResize = () => {
    if (window.innerWidth >= 768) {
      this.isMobileMenuOpen = false;
    }
  };

  ngOnInit() {
    if (!this.isBrowser) {
      return;
    }

    this.onScroll();
    this.navigationSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isMobileMenuOpen = false;
        requestAnimationFrame(() => this.onScroll());
      });

    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });
  }

  ngOnDestroy() {
    if (!this.isBrowser) {
      return;
    }

    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
    this.navigationSubscription?.unsubscribe();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}
