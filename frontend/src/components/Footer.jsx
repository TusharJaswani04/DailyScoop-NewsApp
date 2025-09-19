
import React from 'react'

const Footer = () => {
  return (
     <footer class="mt-5 py-4 border-top">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h6 class="fw-bold">DailyScoop</h6>
                    <p class="text-muted small">Your trusted source for daily news and updates.</p>
                </div>
                <div class="col-md-3">
                    <h6>Links</h6>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-muted">About</a></li>
                        <li><a href="#" class="text-muted">Contact</a></li>
                        <li><a href="#" class="text-muted">Terms of Service</a></li>
                        <li><a href="#" class="text-muted">Privacy Policy</a></li>
                    </ul>
                </div>
                <div class="col-md-3">
                    <h6>Follow Us</h6>
                    <div class="d-flex gap-3">
                        <a href="#" class="text-muted" target="_blank"><i class="fab fa-facebook"></i></a>
                        <a href="#" class="text-muted" target="_blank"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="text-muted" target="_blank"><i class="fab fa-linkedin"></i></a>
                        <a href="#" class="text-muted" target="_blank"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <hr class="my-3"></hr>
            <div class="text-center text-muted small">
                © 2025 DailyScoop. All rights reserved.
            </div>
        </div>
    </footer>
  )
}

export default Footer
