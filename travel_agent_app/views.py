from functools import wraps

from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.db.models.functions import Lower
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone
from django.views.decorators.http import require_POST

from .forms import BookingEnquiryForm, ContactMessageForm


from .forms import (
    BlogForm,
    CategoryForm,
    DestinationForm,
    TestimonialForm,
    TourPackageForm,
)

from .models import (
    Blog,
    BookingEnquiry,
    Category,
    ContactMessage,
    Destination,
    GalleryImage,
    Testimonial,
    TourPackage,
)



# ============================================================
# ADMIN ACCESS DECORATOR
# ============================================================

def admin_required(view_func):

    @wraps(view_func)
    @login_required(login_url="admin_login")
    def wrapper(request, *args, **kwargs):

        if not request.user.is_staff:
            messages.error(
                request,
                "You do not have permission to access the admin dashboard."
            )

            logout(request)

            return redirect("admin_login")

        return view_func(
            request,
            *args,
            **kwargs
        )

    return wrapper


# ============================================================
# ADMIN LOGIN
# ============================================================

def admin_login(request):

    # Already logged in as an admin
    if request.user.is_authenticated:

        if request.user.is_staff:
            return redirect("admin_dashboard")

        logout(request)


    if request.method == "POST":

        username = request.POST.get(
            "username",
            ""
        ).strip()

        password = request.POST.get(
            "password",
            ""
        )


        # Required fields
        if not username or not password:

            messages.error(
                request,
                "Username and password are required."
            )

            return render(
                request,
                "authenticate/login.html",
            )


        # Authenticate
        user = authenticate(
            request,
            username=username,
            password=password,
        )


        if user is not None and user.is_staff:

            login(
                request,
                user
            )

            messages.success(
                request,
                f"Welcome back, {user.username}!"
            )

            return redirect(
                "admin_dashboard"
            )


        messages.error(
            request,
            "Invalid username, password, or unauthorized access."
        )


    return render(
        request,
        "authenticate/login.html",
    )


# ============================================================
# ADMIN LOGOUT
# ============================================================

@admin_required
def admin_logout(request):

    logout(request)

    messages.success(
        request,
        "You have been logged out successfully."
    )

    return redirect(
        "admin_login"
    )






# ============================================================
# ADMIN DASHBOARD
# ============================================================

@admin_required
def admin_dashboard(request):

    now = timezone.now()

    month_start = now.replace(
        day=1,
        hour=0,
        minute=0,
        second=0,
        microsecond=0,
    )


    # ========================================================
    # STATISTICS
    # ========================================================

    stats = {

        "total_packages":
            TourPackage.objects.count(),

        "total_destinations":
            Destination.objects.count(),

        "total_blogs":
            Blog.objects.count(),

        "blogs_this_month":
            Blog.objects.filter(
                created_at__gte=month_start
            ).count(),

        "total_gallery":
            GalleryImage.objects.count(),

        "total_testimonials":
            Testimonial.objects.count(),

        "total_contacts":
            ContactMessage.objects.count(),

        "total_enquiries":
            BookingEnquiry.objects.count(),
    }


    # ========================================================
    # RECENT DATA
    # ========================================================

    recent_packages = (
        TourPackage.objects
        .order_by("-created_at")[:5]
    )

    recent_destinations = (
        Destination.objects
        .order_by("-created_at")[:5]
    )

    recent_blogs = (
        Blog.objects
        .order_by("-created_at")[:5]
    )

    recent_contacts = (
        ContactMessage.objects
        .order_by("-created_at")[:5]
    )

    recent_enquiries = (
        BookingEnquiry.objects
        .order_by("-created_at")[:5]
    )


    context = {

        "stats": stats,

        "recent_packages":
            recent_packages,

        "recent_destinations":
            recent_destinations,

        "recent_blogs":
            recent_blogs,

        "recent_contacts":
            recent_contacts,

        "recent_enquiries":
            recent_enquiries,
    }


    return render(
        request,
        "admin_pages/dashboard.html",
        context,
    )





# ============================================================
# BLOGS
# ============================================================

@admin_required
def admin_blog_list(request):

    blogs = Paginator(
        Blog.objects.order_by("-created_at"),
        10,
    ).get_page(
        request.GET.get("page")
    )

    return render(
        request,
        "admin_pages/blog_list.html",
        {
            "blogs": blogs,
        },
    )


@admin_required
def blog_create(request):

    form = BlogForm(
        request.POST or None,
        request.FILES or None,
    )

    if form.is_valid():

        form.save()

        messages.success(
            request,
            "Blog created successfully."
        )

        return redirect(
            "admin_blog_list"
        )

    return render(
        request,
        "admin_pages/create_blog.html",
        {
            "form": form,
        },
    )


@admin_required
def blog_update(request, pk):

    blog = get_object_or_404(
        Blog,
        pk=pk,
    )

    form = BlogForm(
        request.POST or None,
        request.FILES or None,
        instance=blog,
    )

    if form.is_valid():

        form.save()

        messages.success(
            request,
            "Blog updated successfully."
        )

        return redirect(
            "admin_blog_list"
        )

    return render(
        request,
        "admin_pages/create_blog.html",
        {
            "form": form,
            "blog": blog,
        },
    )


@admin_required
def blog_delete(request, pk):

    blog = get_object_or_404(
        Blog,
        pk=pk,
    )

    if request.method == "POST":

        blog.delete()

        messages.success(
            request,
            "Blog deleted successfully."
        )

    return redirect(
        "admin_blog_list"
    )





# ============================================================
# TOUR PACKAGES
# ============================================================

@admin_required
def admin_package_list(request):

    packages = Paginator(
        TourPackage.objects.order_by("-created_at"),
        10,
    ).get_page(
        request.GET.get("page")
    )

    return render(
        request,
        "admin_pages/package_list.html",
        {
            "packages": packages,
        },
    )


@admin_required
def package_create(request):

    form = TourPackageForm(
        request.POST or None,
        request.FILES or None,
    )

    if form.is_valid():

        form.save()

        messages.success(
            request,
            "Tour package created successfully."
        )

        return redirect(
            "admin_package_list"
        )

    return render(
        request,
        "admin_pages/create_package.html",
        {
            "form": form,
        },
    )


@admin_required
def package_update(request, pk):

    package = get_object_or_404(
        TourPackage,
        pk=pk,
    )

    form = TourPackageForm(
        request.POST or None,
        request.FILES or None,
        instance=package,
    )

    if form.is_valid():

        form.save()

        messages.success(
            request,
            "Tour package updated successfully."
        )

        return redirect(
            "admin_package_list"
        )

    return render(
        request,
        "admin_pages/create_package.html",
        {
            "form": form,
            "package": package,
        },
    )


@admin_required
def package_delete(request, pk):

    package = get_object_or_404(
        TourPackage,
        pk=pk,
    )

    if request.method == "POST":

        package.delete()

        messages.success(
            request,
            "Tour package deleted successfully."
        )

    return redirect(
        "admin_package_list"
    )




# ============================================================
# DESTINATIONS
# ============================================================

@admin_required
def admin_destination_list(request):

    destinations = Paginator(
        Destination.objects.order_by("-created_at"),
        10,
    ).get_page(
        request.GET.get("page")
    )

    return render(
        request,
        "admin_pages/destination_list.html",
        {
            "destinations": destinations,
        },
    )


@admin_required
def destination_create(request):

    form = DestinationForm(
        request.POST or None,
        request.FILES or None,
    )

    if form.is_valid():

        form.save()

        messages.success(
            request,
            "Destination created successfully."
        )

        return redirect(
            "admin_destination_list"
        )

    return render(
        request,
        "admin_pages/create_destination.html",
        {
            "form": form,
        },
    )


@admin_required
def destination_update(request, pk):

    destination = get_object_or_404(
        Destination,
        pk=pk,
    )

    form = DestinationForm(
        request.POST or None,
        request.FILES or None,
        instance=destination,
    )

    if form.is_valid():

        form.save()

        messages.success(
            request,
            "Destination updated successfully."
        )

        return redirect(
            "admin_destination_list"
        )

    return render(
        request,
        "admin_pages/create_destination.html",
        {
            "form": form,
            "destination": destination,
        },
    )


@admin_required
def destination_delete(request, pk):

    destination = get_object_or_404(
        Destination,
        pk=pk,
    )

    if request.method == "POST":

        destination.delete()

        messages.success(
            request,
            "Destination deleted successfully."
        )

    return redirect(
        "admin_destination_list"
    )





# ============================================================
# GALLERY
# ============================================================

@admin_required
def gallery_images(request):

    categories = (
        Category.objects
        .prefetch_related("images")
        .order_by("name")
    )

    return render(
        request,
        "admin_pages/image_list.html",
        {
            "categories": categories,
        },
    )


@admin_required
def add_image(request):

    categories = Category.objects.order_by(
        "name"
    )

    if request.method == "POST":

        category_id = request.POST.get(
            "category"
        )

        files = request.FILES.getlist(
            "images"
        )

        if not category_id:

            messages.error(
                request,
                "Please select a category."
            )

            return render(
                request,
                "admin_pages/add_image.html",
                {
                    "categories": categories,
                },
            )


        category = get_object_or_404(
            Category,
            pk=category_id,
        )


        if not files:

            messages.error(
                request,
                "Please select at least one image."
            )

            return render(
                request,
                "admin_pages/add_image.html",
                {
                    "categories": categories,
                },
            )


        for image_file in files:

            GalleryImage.objects.create(
                category=category,
                title=image_file.name,
                image=image_file,
            )


        messages.success(
            request,
            "Gallery images uploaded successfully."
        )

        return redirect(
            "list_image"
        )


    return render(
        request,
        "admin_pages/add_image.html",
        {
            "categories": categories,
        },
    )


@admin_required
def delete_image(request, image_id):

    image = get_object_or_404(
        GalleryImage,
        pk=image_id,
    )

    if request.method == "POST":

        image.delete()

        messages.success(
            request,
            "Gallery image deleted successfully."
        )

    return redirect(
        "list_image"
    )





# ============================================================
# CATEGORIES
# ============================================================

@admin_required
def category_list(request):

    categories = Category.objects.order_by(
        Lower("name")
    )

    return render(
        request,
        "admin_pages/category_list.html",
        {
            "categories": categories,
        },
    )


@admin_required
def add_category(request):

    form = CategoryForm(
        request.POST or None
    )

    if form.is_valid():

        form.save()

        messages.success(
            request,
            "Category added successfully."
        )

        return redirect(
            "category_list"
        )

    return render(
        request,
        "admin_pages/add_category.html",
        {
            "form": form,
        },
    )


@admin_required
def update_category(request, pk):

    category = get_object_or_404(
        Category,
        pk=pk,
    )

    form = CategoryForm(
        request.POST or None,
        instance=category,
    )

    if form.is_valid():

        form.save()

        messages.success(
            request,
            "Category updated successfully."
        )

        return redirect(
            "category_list"
        )

    return render(
        request,
        "admin_pages/add_category.html",
        {
            "form": form,
            "category": category,
        },
    )


@admin_required
def delete_category(request, pk):

    category = get_object_or_404(
        Category,
        pk=pk,
    )

    if request.method == "POST":

        category.delete()

        messages.success(
            request,
            "Category deleted successfully."
        )

    return redirect(
        "category_list"
    )






# ============================================================
# TESTIMONIALS
# ============================================================

@admin_required
def testimonial_list(request):

    testimonials = Paginator(
        Testimonial.objects.order_by("-created_at"),
        10,
    ).get_page(
        request.GET.get("page")
    )

    return render(
        request,
        "admin_pages/review_list.html",
        {
            "testimonials": testimonials,
        },
    )


@admin_required
def testimonial_create(request):

    form = TestimonialForm(
        request.POST or None,
        request.FILES or None,
    )

    if form.is_valid():

        form.save()

        messages.success(
            request,
            "Testimonial created successfully."
        )

        return redirect(
            "review_list"
        )

    return render(
        request,
        "admin_pages/create_review.html",
        {
            "form": form,
        },
    )


@admin_required
def testimonial_update(request, pk):

    testimonial = get_object_or_404(
        Testimonial,
        pk=pk,
    )

    form = TestimonialForm(
        request.POST or None,
        request.FILES or None,
        instance=testimonial,
    )

    if form.is_valid():

        form.save()

        messages.success(
            request,
            "Testimonial updated successfully."
        )

        return redirect(
            "review_list"
        )

    return render(
        request,
        "admin_pages/create_review.html",
        {
            "form": form,
            "testimonial": testimonial,
        },
    )


@admin_required
def testimonial_delete(request, pk):

    testimonial = get_object_or_404(
        Testimonial,
        pk=pk,
    )

    if request.method == "POST":

        testimonial.delete()

        messages.success(
            request,
            "Testimonial deleted successfully."
        )

    return redirect(
        "review_list"
    )




# ============================================================
# CONTACT MESSAGES
# ============================================================

@admin_required
def view_contacts(request):

    contacts = Paginator(
        ContactMessage.objects.order_by("-created_at"),
        10,
    ).get_page(
        request.GET.get("page")
    )

    return render(
        request,
        "admin_pages/view_contacts.html",
        {
            "contacts": contacts,
        },
    )


@admin_required
def delete_contact(request, pk):

    contact = get_object_or_404(
        ContactMessage,
        pk=pk,
    )

    if request.method == "POST":

        contact.delete()

        messages.success(
            request,
            "Contact message deleted successfully."
        )

    return redirect(
        "view_contacts"
    )




# ============================================================
# BOOKING ENQUIRIES - ADMIN
# ============================================================

@admin_required
def admin_enquiry_list(request):
    """
    Display booking enquiries in the admin dashboard.
    Latest enquiries are shown first.
    """

    enquiry_queryset = BookingEnquiry.objects.all().order_by("-created_at")

    paginator = Paginator(enquiry_queryset, 10)

    page_number = request.GET.get("page")

    enquiries = paginator.get_page(page_number)

    context = {
        "enquiries": enquiries,
    }

    return render(
        request,
        "admin_pages/enquiry_list.html",
        context,
    )


# ============================================================
# DELETE BOOKING ENQUIRY
# ============================================================

@admin_required
@require_POST
def admin_enquiry_delete(request, pk):

    enquiry = get_object_or_404(
        BookingEnquiry,
        pk=pk,
    )

    customer_name = enquiry.name

    enquiry.delete()

    messages.success(
        request,
        f'Booking enquiry from "{customer_name}" deleted successfully.'
    )

    return redirect("admin_enquiry_list")




# front end views


from django.shortcuts import render

from .models import Destination, TourPackage, Testimonial


def home(request):

    destinations = Destination.objects.all()[:8]

    best_packages = TourPackage.objects.all()[:4]

    testimonials = Testimonial.objects.all()[:8]

    blogs = Blog.objects.all()[:4]

    gallery_images = list(
        GalleryImage.objects
        .select_related("category")
        .order_by("-uploaded_at")[:5]
    )

    context = {
        "destinations": destinations,
        "best_packages": best_packages,
        "testimonials": testimonials,
        "blogs": blogs,
        "gallery_images": gallery_images,
    }

    return render(request, "frontend/home.html", context)


from django.shortcuts import render

from .models import Testimonial


def about(request):

    testimonials = Testimonial.objects.all()

    blogs = Blog.objects.all()[:3]

    destinations = Destination.objects.all()[:10]

    # Latest 4 tour packages for About page
    about_packages = TourPackage.objects.all()[:4]

    context = {
        "testimonials": testimonials,
        "blogs": blogs,
        "destinations": destinations,
        "about_packages": about_packages,
    }

    return render(
        request,
        "frontend/about.html",
        context
    )

# ============================================================
# CONTACT PAGE
# ============================================================

def contact(request):

    if request.method == "POST":

        form = ContactMessageForm(request.POST)

        if form.is_valid():

            # ------------------------------------------------
            # SAVE CONTACT ENQUIRY TO DATABASE
            # ------------------------------------------------

            contact_message = form.save()


            # ------------------------------------------------
            # PREPARE ADMIN EMAIL
            # ------------------------------------------------

            full_name = (
                f"{contact_message.first_name} "
                f"{contact_message.last_name}"
            )

            subject = (
                f"New Contact Enquiry - {full_name}"
            )


            email_body = f"""
New Contact Enquiry

A new customer enquiry has been submitted through the website.

----------------------------------------
CUSTOMER DETAILS
----------------------------------------

Name:
{full_name}

Phone:
{contact_message.phone}

Email:
{contact_message.email or "Not provided"}

----------------------------------------
MESSAGE
----------------------------------------

{contact_message.message or "No message provided."}

----------------------------------------
SUBMITTED ON
----------------------------------------

{contact_message.created_at.strftime("%d %B %Y, %I:%M %p")}

----------------------------------------

This enquiry has also been saved in the admin database.
"""


            # ------------------------------------------------
            # SEND EMAIL TO ADMIN
            # ------------------------------------------------

            try:

                send_mail(
                    subject=subject,
                    message=email_body,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[
                        settings.ADMIN_CONTACT_EMAIL
                    ],
                    fail_silently=False,
                )

                messages.success(
                    request,
                    "Thank you! Your message has been sent successfully. "
                    "Our team will contact you soon."
                )

            except Exception as error:

                # IMPORTANT:
                # Database enquiry remains saved even if email fails.

                print(
                    "Contact email sending failed:",
                    error
                )

                messages.warning(
                    request,
                    "Your enquiry has been received successfully. "
                    "Our team will contact you soon."
                )


            return redirect("contact")


        else:

            messages.error(
                request,
                "Please correct the errors in the form and try again."
            )


    else:

        form = ContactMessageForm()


    context = {
        "form": form,
    }

    return render(
        request,
        "frontend/contact.html",
        context,
    )



from django.core.paginator import Paginator
from django.shortcuts import render

from .models import TourPackage


def packages(request):

    # ==========================================================
    # ALL PACKAGES
    # ==========================================================

    qs = TourPackage.objects.all().order_by("-created_at")


    # ==========================================================
    # PACKAGE TYPE FILTER
    # all / domestic / international
    # ==========================================================

    current_type = request.GET.get("type", "").strip()

    allowed_types = [
        "domestic",
        "international",
    ]

    if current_type in allowed_types:
        qs = qs.filter(package_type=current_type)
    else:
        current_type = ""


    # ==========================================================
    # PAGINATION
    # 3 columns × 3 rows = 9 packages
    # ==========================================================

    paginator = Paginator(qs, 9)

    page_number = request.GET.get("page")

    page_obj = paginator.get_page(page_number)


    # ==========================================================
    # CONTEXT
    # ==========================================================

    context = {

        "packages": page_obj,

        "page_obj": page_obj,

        "current_type": current_type,

    }


    return render(
        request,
        "frontend/packages.html",
        context
    )



from django.shortcuts import render, get_object_or_404

def package_details(request, slug):
    package = get_object_or_404(TourPackage, slug=slug)
    top_packages = TourPackage.objects.exclude(pk=package.pk)[:3]

    return render(request, "frontend/package-details.html", {
        "package": package,
        "top_packages": top_packages,
    })




def destination(request):

    # ==========================================================
    # ALL DESTINATIONS
    # ==========================================================

    qs = Destination.objects.all().order_by("-id")


    # ==========================================================
    # SEARCH
    # ==========================================================

    search_query = request.GET.get("q", "").strip()

    if search_query:
        qs = qs.filter(
            Q(name__icontains=search_query)
        )


    # ==========================================================
    # PAGINATION
    # 3 cards × 3 rows = 9
    # ==========================================================

    paginator = Paginator(qs, 9)

    page_number = request.GET.get("page")

    page_obj = paginator.get_page(page_number)


    context = {
        "destinations": page_obj,
        "page_obj": page_obj,
        "search_query": search_query,
    }


    return render(
        request,
        "frontend/destination.html",
        context
    )



from django.shortcuts import render, get_object_or_404

def destination_details(request, slug):
    destination = get_object_or_404(Destination, slug=slug)
    others = Destination.objects.exclude(pk=destination.pk).order_by("-created_at")

    return render(request, "frontend/destination-details.html", {
        "destination": destination,
        "other_destinations": others[:2],
        "top_destinations": others[:3],
    })


from django.shortcuts import render, get_object_or_404

from .models import Blog


def blogs(request):

    blogs = Blog.objects.all()

    context = {
        "blogs": blogs,
    }

    return render(
        request,
        "frontend/blogs.html",
        context,
    )

def blog_detail(request, slug):

    blog = get_object_or_404(
        Blog,
        slug=slug,
    )

    # Latest/related blogs except the current blog
    related_blogs = (
        Blog.objects
        .exclude(pk=blog.pk)
        .order_by("-created_at")[:4]
    )

    return render(
        request,
        "frontend/blog_detail.html",
        {
            "blog": blog,
            "related_blogs": related_blogs,
        },
    )


# ============================================================
# FRONTEND GALLERY
# ============================================================

def gallery(request):

    categories = (
        Category.objects
        .order_by("name")
    )

    gallery_images = (
        GalleryImage.objects
        .select_related("category")
        .order_by("-uploaded_at")
    )

    context = {
        "categories": categories,
        "gallery_images": gallery_images,
    }

    return render(
        request,
        "frontend/gallery.html",
        context
    )




# ============================================================
# TERMS AND CONDITIONS
# ============================================================

def terms_conditions(request):

    return render(
        request,
        "frontend/terms_conditions.html"
    )




def custom_404(request, exception):
    return render(
        request,
        "frontend/404.html",
        status=404,
    )




@require_POST
def booking_enquiry(request):

    form = BookingEnquiryForm(request.POST)

    if form.is_valid():

        enquiry = form.save()

        return JsonResponse(
            {
                "success": True,

                "message": "Your enquiry has been submitted successfully.",

                "enquiry": {

                    "name": enquiry.name,

                    "phone": enquiry.phone,

                    "package": (
                        enquiry.package
                        or "General Enquiry"
                    ),

                    "start_date": (
                        enquiry.start_date.strftime(
                            "%d-%m-%Y"
                        )
                    ),

                    "end_date": (
                        enquiry.end_date.strftime(
                            "%d-%m-%Y"
                        )
                    ),

                    "adults": enquiry.adults,

                    "children": enquiry.children,

                    "message": (
                        enquiry.message
                        or ""
                    ),
                }
            }
        )


    errors = {}

    for field, field_errors in form.errors.items():

        errors[field] = [
            str(error)
            for error in field_errors
        ]


    return JsonResponse(
        {
            "success": False,

            "message":
                "Please check the form and try again.",

            "errors": errors,
        },

        status=400
    )