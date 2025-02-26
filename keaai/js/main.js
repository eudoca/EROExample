/**
 * KeaAI - Main JavaScript
 * Provides interactive functionality for the KeaAI application
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dropzone functionality
    initializeDropzone();
    
    // Initialize table functionality
    initializeTableInteractions();
    
    // Initialize tooltips and popovers
    initializeBootstrapComponents();
});

/**
 * Initialize file upload dropzone
 */
function initializeDropzone() {
    const dropzone = document.querySelector('.upload-dropzone');
    
    if (dropzone) {
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });
        
        // Highlight dropzone when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, unhighlight, false);
        });
        
        // Handle dropped files
        dropzone.addEventListener('drop', handleDrop, false);
        
        // Handle browse files button
        const browseButton = dropzone.querySelector('button');
        if (browseButton) {
            browseButton.addEventListener('click', function() {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.multiple = true;
                fileInput.accept = '.pdf,.docx,.txt';
                fileInput.click();
                
                fileInput.addEventListener('change', function() {
                    if (this.files.length) {
                        handleFiles(this.files);
                    }
                });
            });
        }
    }
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function highlight() {
        dropzone.classList.add('dragover');
    }
    
    function unhighlight() {
        dropzone.classList.remove('dragover');
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }
    
    function handleFiles(files) {
        // Simulate file upload process
        console.log(`Processing ${files.length} files...`);
        
        // Create a notification
        createNotification(`${files.length} files added to processing queue`);
        
        // In a real application, you would upload these files to the server
        // For demo purposes, we'll just simulate the process
        simulateFileProcessing(files);
    }
    
    function simulateFileProcessing(files) {
        // Get processing progress bars
        const processingBar = document.querySelector('.progress-bar-striped');
        const queuedBar = document.querySelector('.progress-bar.bg-warning');
        
        if (processingBar && queuedBar) {
            // Update queued count
            const queuedCountElement = queuedBar.closest('.col-md-3').querySelector('.text-warning');
            let queuedCount = parseInt(queuedCountElement.textContent);
            queuedCount += files.length;
            queuedCountElement.textContent = queuedCount;
            
            // Process files one by one (simulated)
            let processed = 0;
            
            const processInterval = setInterval(() => {
                if (processed >= files.length) {
                    clearInterval(processInterval);
                    return;
                }
                
                // Update processing count
                const processingCountElement = processingBar.closest('.col-md-3').querySelector('.text-primary');
                let processingCount = parseInt(processingCountElement.textContent);
                processingCount += 1;
                processingCountElement.textContent = processingCount;
                
                // Update processing progress
                const processingMax = parseInt(processingBar.getAttribute('aria-valuemax'));
                const processingWidth = (processingCount / processingMax) * 100;
                processingBar.style.width = `${processingWidth}%`;
                processingBar.setAttribute('aria-valuenow', processingCount);
                
                // Update queued count
                queuedCount -= 1;
                queuedCountElement.textContent = queuedCount;
                
                processed++;
                
                // After a delay, move to completed
                setTimeout(() => {
                    // Update completed count
                    const completedBar = document.querySelector('.progress-bar.bg-success');
                    const completedCountElement = completedBar.closest('.col-md-3').querySelector('.text-success');
                    let completedCount = parseInt(completedCountElement.textContent);
                    completedCount += 1;
                    completedCountElement.textContent = completedCount;
                    
                    // Update processing count
                    processingCount -= 1;
                    processingCountElement.textContent = processingCount;
                    
                    // Update processing progress
                    const newProcessingWidth = (processingCount / processingMax) * 100;
                    processingBar.style.width = `${newProcessingWidth}%`;
                    processingBar.setAttribute('aria-valuenow', processingCount);
                    
                    // Add to recently viewed
                    addToRecentlyViewed(`Document ${completedCount}`, 'Strategic Action Plan', 'Just now');
                    
                }, 2000);
                
            }, 1500);
        }
    }
}

/**
 * Initialize table interactions
 */
function initializeTableInteractions() {
    // Handle row selection in tables
    const checkboxes = document.querySelectorAll('table .form-check-input');
    const selectAll = document.getElementById('selectAll');
    
    if (checkboxes.length && selectAll) {
        selectAll.addEventListener('change', function() {
            checkboxes.forEach(checkbox => {
                if (checkbox !== selectAll) {
                    checkbox.checked = selectAll.checked;
                }
            });
        });
        
        checkboxes.forEach(checkbox => {
            if (checkbox !== selectAll) {
                checkbox.addEventListener('change', function() {
                    // Check if all checkboxes are checked
                    const allChecked = Array.from(checkboxes).every(c => {
                        return c === selectAll || c.checked;
                    });
                    
                    // Check if any checkbox is checked
                    const anyChecked = Array.from(checkboxes).some(c => {
                        return c !== selectAll && c.checked;
                    });
                    
                    selectAll.checked = allChecked;
                    selectAll.indeterminate = anyChecked && !allChecked;
                });
            }
        });
    }
    
    // Make table rows with data-bs-toggle="collapse" clickable
    const clickableRows = document.querySelectorAll('tr.clickable');
    
    clickableRows.forEach(row => {
        row.addEventListener('click', function(e) {
            // Don't toggle if clicking on a checkbox or button
            if (e.target.closest('.form-check') || e.target.closest('button') || e.target.closest('.dropdown')) {
                return;
            }
            
            const target = this.getAttribute('data-bs-target');
            const targetElement = document.querySelector(target);
            
            if (targetElement) {
                const bsCollapse = new bootstrap.Collapse(targetElement, {
                    toggle: true
                });
            }
        });
    });
}

/**
 * Initialize Bootstrap components
 */
function initializeBootstrapComponents() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

/**
 * Create a notification toast
 */
function createNotification(message, type = 'success') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    
    // Create toast content
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    // Add toast to container
    toastContainer.appendChild(toastEl);
    
    // Initialize and show toast
    const toast = new bootstrap.Toast(toastEl, {
        autohide: true,
        delay: 3000
    });
    
    toast.show();
    
    // Remove toast after it's hidden
    toastEl.addEventListener('hidden.bs.toast', function() {
        toastEl.remove();
    });
}

/**
 * Add item to recently viewed list
 */
function addToRecentlyViewed(title, description, time) {
    const recentlyViewedList = document.querySelector('.card-title:contains("Recently Viewed")');
    
    if (recentlyViewedList) {
        const listGroup = recentlyViewedList.closest('.card').querySelector('.list-group');
        
        if (listGroup) {
            // Create new list item
            const newItem = document.createElement('a');
            newItem.href = '#';
            newItem.className = 'list-group-item list-group-item-action';
            
            newItem.innerHTML = `
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">${title}</h6>
                    <small class="text-muted">${time}</small>
                </div>
                <p class="mb-1 small">${description}</p>
            `;
            
            // Add to the top of the list
            listGroup.insertBefore(newItem, listGroup.firstChild);
            
            // Remove the last item if there are more than 3
            if (listGroup.children.length > 3) {
                listGroup.removeChild(listGroup.lastChild);
            }
        }
    }
}

// Add contains selector to prototype
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

// jQuery-like :contains selector
document.querySelectorAll = document.querySelectorAll || function(selector) {
    if (selector.includes(':contains(')) {
        const elements = Array.from(document.querySelectorAll('*'));
        const searchText = selector.match(/:contains\(["']?([^)"']+)["']?\)/)[1];
        const containsSelector = selector.replace(/:contains\(["']?([^)"']+)["']?\)/, '');
        
        return elements.filter(el => {
            return el.textContent.includes(searchText) && 
                   (containsSelector === '' || el.matches(containsSelector));
        });
    } else {
        return document.querySelectorAll(selector);
    }
}; 