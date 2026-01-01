"""
Email service using Resend for sending booking notifications
"""
import os
import asyncio
import logging
import resend
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

logger = logging.getLogger(__name__)

# Initialize Resend with API key
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
SUPPORT_EMAIL = os.environ.get('SUPPORT_EMAIL', 'kawscars.supp@gmail.com')

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY
    logger.info("Resend API configured successfully")
else:
    logger.warning("RESEND_API_KEY not set - email notifications will not work")


async def send_booking_notification(booking_data: dict, car_data: dict):
    """
    Send booking notification email to support team
    
    Args:
        booking_data: Dictionary containing booking information
        car_data: Dictionary containing car information
    """
    if not RESEND_API_KEY:
        logger.warning("Cannot send email - RESEND_API_KEY not configured")
        return None
    
    try:
        # Format dates
        pickup_date = booking_data.get('pickup_date')
        return_date = booking_data.get('return_date')
        
        if isinstance(pickup_date, str):
            pickup_date = datetime.fromisoformat(pickup_date.replace('Z', '+00:00'))
        if isinstance(return_date, str):
            return_date = datetime.fromisoformat(return_date.replace('Z', '+00:00'))
        
        pickup_str = pickup_date.strftime('%d/%m/%Y') if pickup_date else '-'
        return_str = return_date.strftime('%d/%m/%Y') if return_date else '-'
        
        # Calculate duration
        duration = (return_date - pickup_date).days if pickup_date and return_date else 0
        total_price = car_data.get('price_per_day', 0) * duration
        
        # Build HTML email
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background-color: #dc2626; color: white; padding: 20px; text-align: center; }}
                .content {{ background-color: #f9f9f9; padding: 20px; }}
                .section {{ background-color: white; padding: 15px; margin: 10px 0; border-left: 4px solid #dc2626; }}
                .section-title {{ font-size: 18px; font-weight: bold; color: #dc2626; margin-bottom: 10px; }}
                .detail-row {{ padding: 8px 0; border-bottom: 1px solid #eee; }}
                .label {{ font-weight: bold; color: #666; }}
                .value {{ color: #333; }}
                .footer {{ text-align: center; padding: 20px; color: #666; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🚗 Nouvelle Réservation KAWS CAR</h1>
                </div>
                
                <div class="content">
                    <p>Une nouvelle réservation vient d'être effectuée sur le site.</p>
                    
                    <div class="section">
                        <div class="section-title">📋 Détails de la Réservation</div>
                        <div class="detail-row">
                            <span class="label">ID Réservation:</span>
                            <span class="value">{booking_data.get('id', 'N/A')}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Date de création:</span>
                            <span class="value">{datetime.now().strftime('%d/%m/%Y %H:%M')}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Statut:</span>
                            <span class="value">{booking_data.get('status', 'pending').upper()}</span>
                        </div>
                    </div>
                    
                    <div class="section">
                        <div class="section-title">🚗 Véhicule</div>
                        <div class="detail-row">
                            <span class="label">Modèle:</span>
                            <span class="value">{car_data.get('brand', '')} {car_data.get('model', '')}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Année:</span>
                            <span class="value">{car_data.get('year', 'N/A')}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Transmission:</span>
                            <span class="value">{car_data.get('transmission', 'N/A')}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Carburant:</span>
                            <span class="value">{car_data.get('fuel', 'N/A')}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Prix:</span>
                            <span class="value">{car_data.get('price_per_day', 0)} DH/jour</span>
                        </div>
                    </div>
                    
                    <div class="section">
                        <div class="section-title">👤 Informations Client</div>
                        <div class="detail-row">
                            <span class="label">Nom:</span>
                            <span class="value">{booking_data.get('full_name', 'N/A')}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Email:</span>
                            <span class="value">{booking_data.get('email', 'N/A')}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Téléphone:</span>
                            <span class="value">{booking_data.get('phone', 'N/A')}</span>
                        </div>
                    </div>
                    
                    <div class="section">
                        <div class="section-title">📅 Dates et Lieu</div>
                        <div class="detail-row">
                            <span class="label">Prise en charge:</span>
                            <span class="value">{pickup_str}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Retour:</span>
                            <span class="value">{return_str}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Durée:</span>
                            <span class="value">{duration} jour(s)</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Lieu:</span>
                            <span class="value">{booking_data.get('pickup_location', 'N/A')}</span>
                        </div>
                    </div>
                    
                    <div class="section">
                        <div class="section-title">💰 Tarification</div>
                        <div class="detail-row">
                            <span class="label">Prix par jour:</span>
                            <span class="value">{car_data.get('price_per_day', 0)} DH</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Nombre de jours:</span>
                            <span class="value">{duration}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Total estimé:</span>
                            <span class="value" style="font-size: 18px; font-weight: bold; color: #dc2626;">{total_price} DH</span>
                        </div>
                    </div>
                    
                    {f'''<div class="section">
                        <div class="section-title">📝 Message du Client</div>
                        <p style="margin: 10px 0;">{booking_data.get('message', '')}</p>
                    </div>''' if booking_data.get('message') else ''}
                </div>
                
                <div class="footer">
                    <p>KAWS CAR - Location de Voiture au Maroc</p>
                    <p>+212666505795 | kawscars.supp@gmail.com</p>
                    <p>Ce message a été envoyé automatiquement. Ne pas répondre.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Email parameters
        params = {
            "from": SENDER_EMAIL,
            "to": [SUPPORT_EMAIL],
            "subject": f"🚗 Nouvelle Réservation - {car_data.get('brand', '')} {car_data.get('model', '')} - {booking_data.get('full_name', '')}",
            "html": html_content
        }
        
        # Send email asynchronously (non-blocking)
        email_response = await asyncio.to_thread(resend.Emails.send, params)
        
        logger.info(f"Booking notification email sent successfully. Email ID: {email_response.get('id')}")
        return email_response
        
    except Exception as e:
        logger.error(f"Failed to send booking notification email: {str(e)}")
        # Don't fail the booking if email fails
        return None
