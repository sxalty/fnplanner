from pwdlib import PasswordHash
import secrets
import hashlib

password_hash = PasswordHash.recommended()

def hash_password(password):
    return password_hash.hash(password)

def verify_password(password, hashed_password):
    return password_hash.verify(password, hashed_password)

def generate_session_token():
    return secrets.token_urlsafe(32)

def hash_session_token(token):
    return hashlib.sha256(token.encode("utf-8")).hexdigest()

