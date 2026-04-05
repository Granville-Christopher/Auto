import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ChevronRight, 
  Star, 
  Shield, 
  Wallet, 
  Wrench, 
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Menu,
  X,
  MessageCircle,
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  Check,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Extended car data with more details
const allCars = [
  {
    id: 1,
    name: 'Ferrari F8 Tributo',
    price: '$285,000',
    year: '2024',
    mileage: '1,200 mi',
    image: '/car-1.jpg',
    tag: 'New Arrival',
    engine: '3.9L V8 Twin-Turbo',
    horsepower: '710 HP',
    transmission: '7-Speed DCT',
    fuelType: 'Petrol',
    color: 'Silver',
    description: 'The Ferrari F8 Tributo is a mid-engine sports car that pays homage to the most powerful V8 in Ferrari history. With breathtaking performance and stunning Italian design, it represents the pinnacle of automotive excellence.',
    features: ['Carbon Ceramic Brakes', 'Adaptive Suspension', 'Launch Control', 'Sport Exhaust', 'Racing Seats', 'Infotainment System']
  },
  {
    id: 2,
    name: 'Porsche 911 GT3',
    price: '$245,000',
    year: '2023',
    mileage: '3,500 mi',
    image: '/car-2.jpg',
    tag: 'Featured',
    engine: '4.0L Flat-6 Naturally Aspirated',
    horsepower: '502 HP',
    transmission: '6-Speed Manual',
    fuelType: 'Petrol',
    color: 'Black',
    description: 'The Porsche 911 GT3 is a track-focused masterpiece that delivers pure driving pleasure. With its high-revving naturally aspirated engine and precise handling, it sets the benchmark for sports cars.',
    features: ['Rear-Wheel Steering', 'Active Aerodynamics', 'Club Sport Package', 'Full Bucket Seats', 'Chrono Package', 'Porsche Track Precision App']
  },
  {
    id: 3,
    name: 'McLaren 720S',
    price: '$310,000',
    year: '2024',
    mileage: '800 mi',
    image: '/car-3.jpg',
    tag: 'Limited',
    engine: '4.0L V8 Twin-Turbo',
    horsepower: '710 HP',
    transmission: '7-Speed SSG',
    fuelType: 'Petrol',
    color: 'Blue',
    description: 'The McLaren 720S combines extreme performance with everyday usability. Its carbon fiber construction and advanced aerodynamics make it one of the fastest and most capable supercars on the road.',
    features: ['Monocage II Carbon Fiber', 'Variable Drift Control', 'Proactive Chassis Control', 'Folding Driver Display', 'Bowers & Wilkins Audio', 'Lift System']
  },
  {
    id: 4,
    name: 'Lamborghini Huracán EVO',
    price: '$275,000',
    year: '2023',
    mileage: '2,100 mi',
    image: '/car-1.jpg',
    tag: 'Hot Deal',
    engine: '5.2L V10 Naturally Aspirated',
    horsepower: '631 HP',
    transmission: '7-Speed DCT',
    fuelType: 'Petrol',
    color: 'Yellow',
    description: 'The Lamborghini Huracán EVO represents the evolution of the V10 super sports car. With enhanced aerodynamics and advanced vehicle dynamics control, it delivers an unmatched driving experience.',
    features: ['LDVI System', 'Aerodynamic Enhancements', 'Touchscreen HMI', 'Apple CarPlay', 'Carbon Ceramic Brakes', 'Magneto-Rheological Suspension']
  },
  {
    id: 5,
    name: 'Aston Martin Vantage',
    price: '$195,000',
    year: '2024',
    mileage: '1,500 mi',
    image: '/car-2.jpg',
    tag: 'New Arrival',
    engine: '4.0L V8 Twin-Turbo',
    horsepower: '503 HP',
    transmission: '8-Speed Auto',
    fuelType: 'Petrol',
    color: 'Green',
    description: 'The Aston Martin Vantage combines British elegance with raw power. Its aggressive stance and refined interior make it the perfect grand tourer for the discerning driver.',
    features: ['Sport Plus Mode', 'Electronic Rear Differential', 'Dynamic Torque Vectoring', 'Leather Interior', 'Bang & Olufsen Audio', '360° Camera']
  },
  {
    id: 6,
    name: 'Bentley Continental GT',
    price: '$265,000',
    year: '2023',
    mileage: '4,200 mi',
    image: '/car-3.jpg',
    tag: 'Luxury',
    engine: '6.0L W12 Twin-Turbo',
    horsepower: '626 HP',
    transmission: '8-Speed DCT',
    fuelType: 'Petrol',
    color: 'White',
    description: 'The Bentley Continental GT redefines luxury grand touring. With its handcrafted interior and effortless performance, it offers the ultimate in comfort and refinement.',
    features: ['Diamond Quilted Leather', 'Rotating Display', 'Night Vision', 'Adaptive Cruise Control', 'Air Suspension', 'Naim Audio System']
  }
];

// WhatsApp contact function
const contactSeller = (car: typeof allCars[0]) => {
  const phoneNumber = '15551234567'; // Replace with actual seller number
  const message = `Hello, I'm interested in the ${car.name} (${car.year}) listed at ${car.price}. Could you provide more information?`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

// Navigation Component
function Navigation({ onShowroomClick, isShowroomPage }: { onShowroomClick: () => void; isShowroomPage?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // On showroom page, always show dark background
    if (isShowroomPage) {
      setIsScrolled(true);
      return;
    }
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isShowroomPage]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isShowroomPage
          ? 'bg-[#121212]/95 backdrop-blur-md py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="w-full px-6 lg:px-12 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl lg:text-3xl font-bold text-white tracking-wider" style={{ fontFamily: 'Teko, sans-serif' }}>
            VELOCITY<span className="text-[#e93d3d]">.</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <button onClick={() => scrollToSection('inventory')} className="text-white/80 hover:text-[#e93d3d] transition-colors text-sm tracking-wide uppercase">
            Inventory
          </button>
          <button onClick={onShowroomClick} className="text-white/80 hover:text-[#e93d3d] transition-colors text-sm tracking-wide uppercase">
            Showroom
          </button>
          <button onClick={() => scrollToSection('services')} className="text-white/80 hover:text-[#e93d3d] transition-colors text-sm tracking-wide uppercase">
            Services
          </button>
          <button onClick={() => scrollToSection('testimonials')} className="text-white/80 hover:text-[#e93d3d] transition-colors text-sm tracking-wide uppercase">
            Testimonials
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-white/80 hover:text-[#e93d3d] transition-colors text-sm tracking-wide uppercase">
            Contact
          </button>
          <Button 
            onClick={() => scrollToSection('contact')}
            className="bg-[#e93d3d] hover:bg-[#d13232] text-white px-6 py-2 rounded-none uppercase tracking-wider text-sm"
          >
            Get Quote
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#121212]/95 backdrop-blur-md py-6 px-6">
          <div className="flex flex-col gap-4">
            <button onClick={() => scrollToSection('inventory')} className="text-white/80 hover:text-[#e93d3d] transition-colors text-lg tracking-wide uppercase text-left">
              Inventory
            </button>
            <button onClick={onShowroomClick} className="text-white/80 hover:text-[#e93d3d] transition-colors text-lg tracking-wide uppercase text-left">
              Showroom
            </button>
            <button onClick={() => scrollToSection('services')} className="text-white/80 hover:text-[#e93d3d] transition-colors text-lg tracking-wide uppercase text-left">
              Services
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-white/80 hover:text-[#e93d3d] transition-colors text-lg tracking-wide uppercase text-left">
              Testimonials
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-white/80 hover:text-[#e93d3d] transition-colors text-lg tracking-wide uppercase text-left">
              Contact
            </button>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-[#e93d3d] hover:bg-[#d13232] text-white px-6 py-3 rounded-none uppercase tracking-wider text-sm w-full mt-4"
            >
              Get Quote
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

// Vehicle Detail Modal
function VehicleModal({ car, isOpen, onClose }: { car: typeof allCars[0] | null; isOpen: boolean; onClose: () => void }) {
  if (!car) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white p-0 gap-0">
        <div className="relative h-64 lg:h-80">
          <img 
            src={car.image} 
            alt={car.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="bg-[#e93d3d] text-white text-xs uppercase tracking-wider px-3 py-1">
              {car.tag}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h2 
              className="text-3xl lg:text-4xl font-bold text-white mb-2"
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              {car.name}
            </h2>
            <p className="text-2xl font-bold text-[#e93d3d]">{car.price}</p>
          </div>
        </div>
        
        <div className="p-6 lg:p-8">
          {/* Quick Specs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#f5f5f5] p-4 rounded-lg text-center">
              <Calendar className="mx-auto mb-2 text-[#e93d3d]" size={20} />
              <p className="text-xs text-[#333]/60">Year</p>
              <p className="font-bold text-[#121212]">{car.year}</p>
            </div>
            <div className="bg-[#f5f5f5] p-4 rounded-lg text-center">
              <Gauge className="mx-auto mb-2 text-[#e93d3d]" size={20} />
              <p className="text-xs text-[#333]/60">Mileage</p>
              <p className="font-bold text-[#121212]">{car.mileage}</p>
            </div>
            <div className="bg-[#f5f5f5] p-4 rounded-lg text-center">
              <Settings2 className="mx-auto mb-2 text-[#e93d3d]" size={20} />
              <p className="text-xs text-[#333]/60">Transmission</p>
              <p className="font-bold text-[#121212]">{car.transmission}</p>
            </div>
            <div className="bg-[#f5f5f5] p-4 rounded-lg text-center">
              <Fuel className="mx-auto mb-2 text-[#e93d3d]" size={20} />
              <p className="text-xs text-[#333]/60">Fuel Type</p>
              <p className="font-bold text-[#121212]">{car.fuelType}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#121212] mb-3" style={{ fontFamily: 'Teko, sans-serif' }}>Description</h3>
            <p className="text-[#333]/70 leading-relaxed">{car.description}</p>
          </div>

          {/* Technical Specs */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#121212] mb-3" style={{ fontFamily: 'Teko, sans-serif' }}>Technical Specifications</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex justify-between py-2 border-b border-[#eee]">
                <span className="text-[#333]/60">Engine</span>
                <span className="font-medium text-[#121212]">{car.engine}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#eee]">
                <span className="text-[#333]/60">Horsepower</span>
                <span className="font-medium text-[#121212]">{car.horsepower}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#eee]">
                <span className="text-[#333]/60">Color</span>
                <span className="font-medium text-[#121212]">{car.color}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#eee]">
                <span className="text-[#333]/60">Condition</span>
                <span className="font-medium text-[#121212]">Excellent</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#121212] mb-3" style={{ fontFamily: 'Teko, sans-serif' }}>Key Features</h3>
            <div className="grid grid-cols-2 gap-2">
              {car.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check size={16} className="text-[#e93d3d]" />
                  <span className="text-sm text-[#333]/70">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => contactSeller(car)}
              className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white py-6 rounded-none uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              Contact Seller
            </Button>
            <Button 
              onClick={() => {
                onClose();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex-1 bg-[#e93d3d] hover:bg-[#d13232] text-white py-6 rounded-none uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              Make Enquiry
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Showroom Page Component
function ShowroomPage({ onBack, onCarClick }: { onBack: () => void; onCarClick: (car: typeof allCars[0]) => void }) {
  const [filter, setFilter] = useState('All');
  const pageRef = useRef<HTMLDivElement>(null);

  const filters = ['All', 'New Arrival', 'Featured', 'Limited', 'Luxury'];
  
  const filteredCars = filter === 'All' 
    ? allCars 
    : allCars.filter(car => car.tag === filter);

  useEffect(() => {
    gsap.from('.showroom-card', {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out'
    });
  }, [filter]);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#f5f5f5] pt-24 pb-20">
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-[#333]/60 hover:text-[#e93d3d] transition-colors mb-4"
            >
              <ChevronLeft size={20} />
              Back to Home
            </button>
            <h1 
              className="text-5xl lg:text-7xl font-bold text-[#121212] tracking-tight"
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              OUR <span className="text-[#e93d3d]">SHOWROOM</span>
            </h1>
            <p className="text-[#333]/70 mt-2 max-w-xl">
              Browse our complete collection of premium vehicles. Each car is carefully selected and inspected.
            </p>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm uppercase tracking-wider transition-all ${
                  filter === f 
                    ? 'bg-[#e93d3d] text-white' 
                    : 'bg-white text-[#121212] hover:bg-[#121212] hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredCars.map((car) => (
            <div 
              key={car.id}
              className="showroom-card group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => onCarClick(car)}
            >
              {/* Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#e93d3d] text-white text-xs uppercase tracking-wider px-3 py-1">
                  {car.tag}
                </span>
              </div>

              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 
                  className="text-2xl font-bold text-[#121212] mb-2"
                  style={{ fontFamily: 'Teko, sans-serif' }}
                >
                  {car.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-[#333]/60 mb-3">
                  <span>{car.year}</span>
                  <span className="w-1 h-1 bg-[#333]/40 rounded-full" />
                  <span>{car.mileage}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#333]/60 mb-4">
                  <Settings2 size={14} />
                  <span>{car.transmission}</span>
                  <span className="w-1 h-1 bg-[#333]/40 rounded-full" />
                  <Fuel size={14} />
                  <span>{car.engine}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#e93d3d]">{car.price}</span>
                  <Button 
                    variant="ghost" 
                    className="text-[#121212] hover:text-[#e93d3d] p-0 flex items-center gap-1 group/btn"
                  >
                    View Details
                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCars.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#333]/60 text-lg">No vehicles found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Hero Section
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headingRef.current, { opacity: 0, y: 100, rotateX: 90 });
      gsap.set(subheadingRef.current, { opacity: 0, y: 50 });
      gsap.set(ctaRef.current, { opacity: 0, y: 30 });
      gsap.set(imageRef.current, { scale: 1.2, filter: 'blur(20px)' });

      const tl = gsap.timeline({ delay: 0.3 });
      
      tl.to(imageRef.current, {
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'power3.out'
      })
      .to(headingRef.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=1')
      .to(subheadingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.4');

      // Parallax effect for background image only
      gsap.to(imageRef.current, {
        y: 200,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // NOTE: Removed the heading fade-out animation that was causing the text to disappear permanently
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-[#121212]"
    >
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="/hero-car.jpg" 
          alt="Luxury Sports Car"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/80 via-transparent to-[#121212]/40" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span 
          className="text-[20vw] font-bold text-white/[0.03] tracking-wider whitespace-nowrap select-none"
          style={{ fontFamily: 'Teko, sans-serif' }}
        >
          VELOCITY
        </span>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end pb-20 lg:pb-32 px-6 lg:px-12">
        <div className="max-w-4xl">
          <h1 
            ref={headingRef}
            className="text-6xl sm:text-7xl lg:text-9xl font-bold text-white leading-none tracking-tight mb-6"
            style={{ fontFamily: 'Teko, sans-serif', perspective: '1000px' }}
          >
            DRIVE THE <span className="text-[#e93d3d]">THRILL</span>
          </h1>
          <p 
            ref={subheadingRef}
            className="text-lg lg:text-xl text-white/70 max-w-xl mb-8 leading-relaxed"
          >
            Experience the pinnacle of automotive engineering. Curated luxury for the discerning driver.
          </p>
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <Button 
              onClick={() => document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' })}
              className="magnetic-btn bg-[#e93d3d] hover:bg-[#d13232] text-white px-8 py-6 rounded-none text-lg uppercase tracking-wider flex items-center gap-2"
            >
              Explore Inventory
              <ChevronRight size={20} />
            </Button>
            <Button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              className="magnetic-btn border-white text-white bg-transparent hover:bg-white hover:text-[#121212] px-8 py-6 rounded-none text-lg uppercase tracking-wider transition-all"
            >
              Book Test Drive
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none light-sweep" />
    </section>
  );
}

// Kinetic Marquee Section
function MarqueeSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(marqueeRef.current, 
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  const items = ['LUXURY', 'PERFORMANCE', 'STYLE', 'INNOVATION', 'POWER', 'ELEGANCE'];

  return (
    <section ref={marqueeRef} className="w-full py-8 bg-[#121212] overflow-hidden border-y border-white/10">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center mx-8">
            <span 
              className="text-4xl lg:text-6xl font-bold text-white/10 tracking-wider"
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              {item}
            </span>
            <Star className="mx-8 text-[#ffc800]" size={24} fill="#ffc800" />
          </div>
        ))}
      </div>
    </section>
  );
}

// Inventory Section
function InventorySection({ onCarClick }: { onCarClick: (car: typeof allCars[0]) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const cars = allCars.slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.inventory-heading', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.from('.car-card', {
        opacity: 0,
        y: 80,
        rotateY: -15,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="inventory" 
      className="w-full py-20 lg:py-32 bg-[#f5f5f5]"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="inventory-heading mb-12 lg:mb-16">
          <span className="text-[#e93d3d] text-sm uppercase tracking-widest mb-4 block">Our Collection</span>
          <h2 
            className="text-5xl lg:text-7xl font-bold text-[#121212] tracking-tight"
            style={{ fontFamily: 'Teko, sans-serif' }}
          >
            FEATURED INVENTORY
          </h2>
          <p className="text-[#333]/70 mt-4 max-w-xl">
            Hand-selected machines for the road ahead. Each vehicle undergoes rigorous inspection and certification.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          style={{ perspective: '1000px' }}
        >
          {cars.map((car) => (
            <div 
              key={car.id}
              className="car-card group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => onCarClick(car)}
            >
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#e93d3d] text-white text-xs uppercase tracking-wider px-3 py-1">
                  {car.tag}
                </span>
              </div>

              <div className="relative h-64 lg:h-72 overflow-hidden">
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 
                  className="text-2xl font-bold text-[#121212] mb-2"
                  style={{ fontFamily: 'Teko, sans-serif' }}
                >
                  {car.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-[#333]/60 mb-4">
                  <span>{car.year}</span>
                  <span className="w-1 h-1 bg-[#333]/40 rounded-full" />
                  <span>{car.mileage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#e93d3d]">{car.price}</span>
                  <Button 
                    variant="ghost" 
                    className="text-[#121212] hover:text-[#e93d3d] p-0 flex items-center gap-1 group/btn"
                  >
                    Details
                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Showroom Section (Homepage teaser)
function ShowroomHomeSection({ onViewShowroom }: { onViewShowroom: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(image1Ref.current, {
        y: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to(image2Ref.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.from(textRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="showroom" 
      className="w-full py-20 lg:py-32 bg-[#f5f5f5] overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative h-[500px] lg:h-[600px]">
            <div 
              ref={image1Ref}
              className="absolute top-0 left-0 w-[85%] h-[70%] rounded-lg overflow-hidden shadow-2xl"
            >
              <img 
                src="/showroom-1.jpg" 
                alt="Luxury Showroom"
                className="w-full h-full object-cover"
              />
            </div>
            <div 
              ref={image2Ref}
              className="absolute bottom-0 right-0 w-[60%] h-[50%] rounded-lg overflow-hidden shadow-2xl z-10"
            >
              <img 
                src="/showroom-2.jpg" 
                alt="Premium Vehicle"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-[#e93d3d] rounded-lg -z-10" />
          </div>

          <div ref={textRef}>
            <span className="text-[#e93d3d] text-sm uppercase tracking-widest mb-4 block">Our Showroom</span>
            <h2 
              className="text-5xl lg:text-7xl font-bold text-[#121212] tracking-tight mb-6"
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              EXPERIENCE <span className="text-[#e93d3d]">LUXURY</span>
            </h2>
            <p className="text-[#333]/70 text-lg leading-relaxed mb-6">
              Step into our state-of-the-art showroom where automotive dreams come to life. 
              Immerse yourself in an environment designed to showcase the finest vehicles 
              in their full glory.
            </p>
            <p className="text-[#333]/70 leading-relaxed mb-8">
              Our expert consultants are dedicated to understanding your unique preferences 
              and guiding you through every step of your journey to find the perfect vehicle 
              that matches your lifestyle and aspirations.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <span className="text-4xl font-bold text-[#e93d3d]" style={{ fontFamily: 'Teko, sans-serif' }}>500+</span>
                <p className="text-[#333]/60 text-sm">Vehicles Sold</p>
              </div>
              <div>
                <span className="text-4xl font-bold text-[#e93d3d]" style={{ fontFamily: 'Teko, sans-serif' }}>15+</span>
                <p className="text-[#333]/60 text-sm">Years Experience</p>
              </div>
            </div>
            <Button 
              onClick={onViewShowroom}
              className="bg-[#121212] hover:bg-[#e93d3d] text-white px-8 py-6 rounded-none uppercase tracking-wider transition-colors"
            >
              View All Cars
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Shield,
      title: 'Certified Pre-Owned',
      description: 'Every vehicle undergoes a comprehensive 150-point inspection and comes with extended warranty coverage.'
    },
    {
      icon: Wallet,
      title: 'Custom Financing',
      description: 'Tailored financing solutions with competitive rates and flexible terms to fit your budget.'
    },
    {
      icon: Wrench,
      title: 'Premium Servicing',
      description: 'Factory-trained technicians using genuine parts to keep your vehicle performing at its peak.'
    },
    {
      icon: TrendingUp,
      title: 'Trade-In Valuation',
      description: 'Get the best value for your current vehicle with our transparent appraisal process.'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-heading', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.from('.service-card', {
        opacity: 0,
        y: 60,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="w-full py-20 lg:py-32 bg-[#121212]"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="service-heading text-center mb-16">
          <span className="text-[#e93d3d] text-sm uppercase tracking-widest mb-4 block">What We Offer</span>
          <h2 
            className="text-5xl lg:text-7xl font-bold tracking-tight"
            style={{ fontFamily: 'Teko, sans-serif', color: '#ffffff' }}
          >
            OUR EXPERTISE
          </h2>
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="service-card group p-8 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-[#e93d3d]/50 transition-all duration-300"
            >
              <service.icon 
                className="text-[#e93d3d] mb-6 group-hover:scale-110 transition-transform" 
                size={40} 
                strokeWidth={1.5}
              />
              <h3 
                className="text-2xl font-bold text-white mb-4 group-hover:translate-x-2 transition-transform"
                style={{ fontFamily: 'Teko, sans-serif', color: '#ffffff' }}
              >
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: "The service was impeccable. They didn't just sell me a car; they delivered a dream. The attention to detail and personalized care exceeded all expectations.",
      author: "Alex Mercer",
      role: "Business Executive",
      image: "/testimonial-1.jpg",
      rating: 5
    },
    {
      id: 2,
      quote: "From the moment I walked in, I knew I was in good hands. The team at Velocity made the entire process seamless and enjoyable.",
      author: "Sarah Chen",
      role: "Entrepreneur",
      image: "/testimonial-2.jpg",
      rating: 5
    },
    {
      id: 3,
      quote: "I've purchased many vehicles over the years, but Velocity stands out for their professionalism and genuine passion for automobiles.",
      author: "Maria Santos",
      role: "Design Director",
      image: "/testimonial-3.jpg",
      rating: 5
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-heading', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="testimonials" 
      className="w-full py-20 lg:py-32 bg-[#f5f5f5]"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="testimonial-heading text-center mb-16">
          <span className="text-[#e93d3d] text-sm uppercase tracking-widest mb-4 block">Testimonials</span>
          <h2 
            className="text-5xl lg:text-7xl font-bold text-[#121212] tracking-tight"
            style={{ fontFamily: 'Teko, sans-serif' }}
          >
            CLIENT STORIES
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="relative flex-shrink-0">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden">
                    <img 
                      src={testimonials[activeIndex].image} 
                      alt={testimonials[activeIndex].author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 -m-2 border-2 border-dashed border-[#e93d3d]/30 rounded-full orbit-border" />
                  <div className="absolute -bottom-2 -right-2 bg-[#ffc800] rounded-full p-2">
                    <Star size={20} fill="#121212" stroke="#121212" />
                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <div className="flex justify-center lg:justify-start gap-1 mb-4">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <Star key={i} size={18} fill="#ffc800" stroke="#ffc800" />
                    ))}
                  </div>
                  <p className="text-lg lg:text-xl text-[#333] leading-relaxed mb-6 italic">
                    "{testimonials[activeIndex].quote}"
                  </p>
                  <div>
                    <p 
                      className="text-xl font-bold text-[#121212]"
                      style={{ fontFamily: 'Teko, sans-serif' }}
                    >
                      {testimonials[activeIndex].author}
                    </p>
                    <p className="text-[#333]/60 text-sm">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'bg-[#e93d3d] w-8' 
                      : 'bg-[#121212]/20 hover:bg-[#121212]/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-content', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="w-full py-20 lg:py-32 bg-[#121212] relative"
    >
      <div className="w-full px-6 lg:px-12 relative z-10">
        <div className="contact-content grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <span className="text-[#e93d3d] text-sm uppercase tracking-widest mb-4 block">Get In Touch</span>
            <h2 
              className="text-5xl lg:text-7xl font-bold text-white tracking-tight mb-6"
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              START YOUR <span className="text-[#e93d3d]">JOURNEY</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Ready to find your dream car? Our team is here to help you every step of the way. 
              Reach out and let's make it happen.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Phone className="text-[#e93d3d]" size={20} />
                </div>
                <div>
                  <p className="text-white/40 text-sm">Phone</p>
                  <p className="text-white">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Mail className="text-[#e93d3d]" size={20} />
                </div>
                <div>
                  <p className="text-white/40 text-sm">Email</p>
                  <p className="text-white">contact@velocity.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <MapPin className="text-[#e93d3d]" size={20} />
                </div>
                <div>
                  <p className="text-white/40 text-sm">Location</p>
                  <p className="text-white">123 Luxury Lane, Beverly Hills, CA 90210</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10">
            <form className="space-y-6">
              <div>
                <label className="text-white/60 text-sm mb-2 block">Your Name</label>
                <Input 
                  placeholder="John Doe"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 rounded-lg py-6 focus:border-[#e93d3d] focus:ring-[#e93d3d]"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-2 block">Email Address</label>
                <Input 
                  type="email"
                  placeholder="john@example.com"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 rounded-lg py-6 focus:border-[#e93d3d] focus:ring-[#e93d3d]"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-2 block">Message</label>
                <Textarea 
                  placeholder="Tell us about your dream car..."
                  rows={4}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 rounded-lg focus:border-[#e93d3d] focus:ring-[#e93d3d] resize-none"
                />
              </div>
              <Button 
                className="w-full bg-[#e93d3d] hover:bg-[#d13232] text-white py-6 rounded-lg uppercase tracking-wider"
              >
                Send Message
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] py-12 lg:py-16">
      <div className="w-full px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          <div>
            <span 
              className="text-3xl font-bold text-white tracking-wider mb-6 block"
              style={{ fontFamily: 'Teko, sans-serif' }}
            >
              VELOCITY<span className="text-[#e93d3d]">.</span>
            </span>
            <p className="text-white/40 text-sm leading-relaxed">
              Premium automotive dealership delivering excellence since 2009. 
              Your journey to luxury starts here.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              {['Inventory', 'Services', 'About Us', 'Financing', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-white/40 hover:text-[#e93d3d] transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-3">
              {['Vehicle Sales', 'Trade-In', 'Financing', 'Servicing', 'Warranty'].map((service) => (
                <li key={service}>
                  <a href="#services" className="text-white/40 hover:text-[#e93d3d] transition-colors text-sm">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Showroom Hours</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between text-white/40">
                <span>Mon - Fri</span>
                <span>9:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between text-white/40">
                <span>Saturday</span>
                <span>10:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between text-white/40">
                <span>Sunday</span>
                <span>12:00 PM - 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            © 2024 Velocity Motors. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/30 hover:text-[#e93d3d] transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-white/30 hover:text-[#e93d3d] transition-colors text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  const [showShowroom, setShowShowroom] = useState(false);
  const [selectedCar, setSelectedCar] = useState<typeof allCars[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCarClick = (car: typeof allCars[0]) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Navigation 
        onShowroomClick={() => { setShowShowroom(true); scrollToTop(); }} 
        isShowroomPage={showShowroom}
      />
      
      {showShowroom ? (
        <ShowroomPage 
          onBack={() => { setShowShowroom(false); scrollToTop(); }} 
          onCarClick={handleCarClick}
        />
      ) : (
        <main>
          <HeroSection />
          <MarqueeSection />
          <InventorySection onCarClick={handleCarClick} />
          <ShowroomHomeSection onViewShowroom={() => { setShowShowroom(true); scrollToTop(); }} />
          <ServicesSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
      )}
      
      {!showShowroom && <Footer />}
      
      <VehicleModal 
        car={selectedCar} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default App;
